# Visualize fire data by country and year

## Data
NASA FIRMS: https://firms.modaps.eosdis.nasa.gov/download/create.php
- MODIS data
- Time range: 2010-2019
- Spatial range: world

## Directories and files
- final_data: data to be used when creating the interactive data viz
  - 2010_country.csv to 2019_country.csv: ranking and fire counts for each country for a specific year
  - allcountry.csv: ranking and fire counts for each country for all years (2010-2019)
  - allcountry200.csv: ranking and fire counts for each country for all years (2010-2019), but only the top 200 countries for each year
- html: all files (HTML, CSS, JS) to create the interactive data visaulization
  - (folder) data:
     - data.js: fire count and rank by and year
     - data2.js: fire count by year and month
     - data3.js: description for text
     - data_bymonth.csv: same as data2.js but in csv format
- python: all files used to process the raw data
  - (folder) raw: normally includes the raw data files from 2010 - 2019, but since each of those files include 3000000 - 5000000 rows, here only a csv file with 1000 rows (MODIS2010.csv) is available as an example, with following fields:
    - latitude
    - longitude
    - brightness
    - scan
    - track
    - acq_date
    - acq_time
    - satellite
    - instrument
    - confidence
    - version
    - bright_t31
    - frp
    - daynight
    - type 
  - (folder) output: sample data outputs that are summaries of fire count by country + year
  - (folder) shapefile: world shapefile boundary (TM_WORLD_BORDERS-0.3.shp)
  - process_fires.py:
    1. loads shapefile
    2. for a sample set of data, read in the points using the lat / lon fields
    3. output: count by month + year, count by hemisphere + year, count country + year
  - process_fires_withpool.py: same as above but using Pool from multiprocessing
  - multiprocess.py: same as above but improved version

