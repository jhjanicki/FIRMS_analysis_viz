# Visualize fire data by country and year

Global fire patterns visualized based on NASA's FIRMS data, focusing on MODIS only and not VIIRS. The MODIS satellite take a ‘snapshot’ of events as it passes over the earth and each active fire detection represents the center of a 1km pixel flagged as containing one or more fires. This visualization can inform us which countries and what time of the year fires most frequently occur by visualizing the fire counts by month and year, fire counts by country by year, and country rankings by year. Why do certain countries have so many fires? Causes can be related to climate conditions, agricultural practices, volcanoes, and more. Many fire evnets over the past decade have lead to deforestation in many regions, from the Amazon to the Congo basin to Indonesia.

<img width="703" alt="Screenshot 2023-07-13 at 15 43 47" src="https://github.com/jhjanicki/FIRMS_data_process_viz/assets/6565011/99bb6106-d578-4e3f-9e06-92be6ba5a539">


## Link
https://juliahanjanicki.com/projects/fires/

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

