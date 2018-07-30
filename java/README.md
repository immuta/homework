# Java Assignment

## Backstory

A data scientist at your company would like to evaluate where the state of Maryland is spending all of its money. The
data that comes back from Maryland's Open Data Portal is not in a format that your data scientist is happy about. She
has already written an algorithm in Spark that reads parquet files and finds anomalies. The algorithm looks at spending
within small geographical areas. The data scientist has decided to group areas with a five character geohash and usually
runs the algorithm against a single geohash at a time. 


## Assignment

You must pull data from https://data.maryland.gov/Budget/State-of-Maryland-Payments-Data-FY2008-to-FY2017/gja3-vy5r. 
Because this data only contains zip codes, you'll need to also call out to
https://nominatim.openstreetmap.org to map zip codes to latitude and longitude since you need coordinates in order to
generate the geohash.

Nominatim has a very strict usage policy and only allows one request per second. You must abide by that restriction.

For the purposes of this exercise, assume the Maryland Open Data Portal is currently only returning a fraction of a percent
of the total amount of available data. So once this moves to production, your application and the output should be written
to handle a large amount of data.
 
Knowing that one of the possible ways to write out parquet files is by starting with Avro, the data scientist has provided 
an Avro schema file (payment.avsc) as a representation of the schema she is expecting. Using Avro is not required, just one 
possibility.

The pom.xml file contains some libraries that may be helpful for the assignment, but feel free to use whatever libraries 
you are comfortable with.

## Wrap it up

When you are finished, tar.gz all the files (only include files you would commit to source control), and send them to the person that emailed you the assignment.
You may need to send a Google Drive or similar link if your email provider complains.
