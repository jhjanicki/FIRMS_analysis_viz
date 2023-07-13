from multiprocessing import Pool
from time import time
from osgeo import ogr
import csv
import pandas as pd
import numpy as np
from sys import exit

class Point(object):
    """ Wrapper for ogr point """
    def __init__(self, lat, lng):
        """ Coordinates are in degrees """
        self.point = ogr.Geometry(ogr.wkbPoint)
        self.point.AddPoint(lng, lat)

    def getOgr(self):
        return self.point
    ogr = property(getOgr)

class Country(object):
    """ Wrapper for ogr country shape. Not meant to be instantiated directly. """
    def __init__(self, shape):
        self.shape = shape

    def getIso(self):
        return self.shape.GetField('ISO2')
    iso = property(getIso)

    def __str__(self):
        return self.shape.GetField('NAME')

    def contains(self, point):
        return self.shape.geometry().Contains(point.ogr)

class CountryChecker(object):
    """ Loads a country shape file, checks coordinates for country location. """

    def __init__(self, country_file):
        driver = ogr.GetDriverByName('ESRI Shapefile')
        self.countryFile = driver.Open(country_file)
        self.layer = self.countryFile.GetLayer()

    def getCountry(self, point):
        """
        Checks given gps-incoming coordinates for country.
        Output is either country shape index or None
        """

        for i in range(self.layer.GetFeatureCount()):
            country = self.layer.GetFeature(i)
            if country.geometry().Contains(point.ogr):
                return Country(country)
        # nothing found
        return None

def get_hemisphere(row):
    if row['latitude'] > 0:
        return 'N'
    else:
        return 'S'

def process_split(row_tuple):
    rows,i = row_tuple

    #load countries shapefile
    cc = CountryChecker('./shapefile/TM_WORLD_BORDERS-0.3.shp')

    # add country column
    rows['country'] = rows.apply(lambda row: 
        cc.getCountry(Point(row['latitude'],row['longitude'])), axis=1)

    # add hemisphere column
    rows['hemisphere'] = rows.apply(lambda row: get_hemisphere(row), axis=1)

    # add month column
    rows['month'] = rows['acq_date'].str[5:7]

    #convert to string
    rows['country']= rows['country'].astype(str)
    rows['hemisphere']= rows['hemisphere'].astype(str)

    return rows

if __name__ == '__main__':
    #load data
    data1 = pd.read_csv('./raw/MODIS2019.csv')
    # data1 = data1.iloc[np.r_[0:2800],:].reset_index()

    #get sample from different ranges of dataframe to have different months, use data if want to use full dataset
    print ("Processing %d rows..." % len(data1))
    
    # define ranges for each pool
    num_pools = 20
    len_range = len(data1)//num_pools
    pool_ranges = [(i*len_range,(i+1)*len_range) for i in range(num_pools)]
    # correct the end of the last range if it is not the length of the data
    if pool_ranges[-1][1] != len(data1):
        pool_ranges[-1] = (pool_ranges[-1][0],len(data1))
    
    start_time = time()
    num_processes = 8
    datae = []
    columns = None
    for start,stop in pool_ranges:
        sub_data = data1.iloc[np.r_[start:stop],:].reset_index()
        split_data = list(
            zip(np.array_split(sub_data,8),range(1,num_processes+1))
        )

        pool_result = None
        with Pool(num_processes) as p:
            pool_result = p.map(process_split, split_data)
            
        sub_data = np.vstack(pool_result)
        datae.append(sub_data)
        if columns is None: columns = pool_result[0].columns

    data1 = pd.DataFrame(data=np.vstack(datae),
        columns=columns)

    print ("in %0.3f seconds" % (time()-start_time))

    # group by month
    data1_month = data1.groupby(['month']).size().reset_index().rename(columns={0:'count'})

    #group by month and hemisphere
    data1_month_hemisphere = data1.groupby(['month','hemisphere']).size().reset_index().rename(columns={0:'count'})

    #group by country
    data1_country = data1.groupby(['country']).size().reset_index().rename(columns={0:'count'})

    #export to csv
    data1_month.to_csv('./output/sample_data_bymonth_2019.csv', sep=',', encoding='utf-8')
    data1_month_hemisphere.to_csv('./output/sample_data_bymonth_hem_2019.csv', sep=',', encoding='utf-8')
    data1_country.to_csv('./output/sample_data_bycountry_2019.csv', sep=',', encoding='utf-8')
