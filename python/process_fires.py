from osgeo import ogr
import csv
import pandas as pd
import numpy as np

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

#load data
data = pd.read_csv('./raw/MODIS2018.csv')

#load countries shapefile
cc = CountryChecker('./shapefile/TM_WORLD_BORDERS-0.3.shp')

#get sample from different ranges of dataframe to have different months, use data if want to use full dataset
data1 = data.iloc[np.r_[0:300, 400000:400300, 2000000:2000300],:].reset_index()
#get month
data1['month'] = data1['acq_date'].str[5:7]

for index, row in data1.iterrows():
    country = cc.getCountry(Point(data1.iloc[index]['latitude'],data1.iloc[index]['longitude']))
    #get country
    data1.at[index,'country'] = country
    #get hemisphere
    if data1.iloc[index]['latitude'] > 0:
        data1.at[index,'hemisphere'] = 'N'
    else:
        data1.at[index,'hemisphere'] = 'S'

#convert to string
data1['country']= data1['country'].astype(str)
data1['hemisphere']= data1['hemisphere'].astype(str)

# group by month
data1_month = data1.groupby(['month']).size().reset_index().rename(columns={0:'count'})

#group by month and hemisphere
data1_month_hemisphere = data1.groupby(['month','hemisphere']).size().reset_index().rename(columns={0:'count'})

#group by country
data1_country = data1.groupby(['country']).size().reset_index().rename(columns={0:'count'})

#export to csv
data1_month.to_csv('./output/sample_data_bymonth_2018.csv', sep=',', encoding='utf-8')
data1_month_hemisphere.to_csv('./output/sample_data_bymonth_hem_2018.csv', sep=',', encoding='utf-8')
data1_country.to_csv('./output/sample_data_bycountry_2018.csv', sep=',', encoding='utf-8')
