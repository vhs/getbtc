import json
import urllib2
import time
import sys

try:
    data = urllib2.urlopen("http://bitcoincharts.com/t/weighted_prices.json")
except IOError, (errno):
    print "%s" % (errno)
    sys.exit()

j = json.load(data)
CADdata = j["CAD"]["24h"]

timestamp = str(time.time())

text_file = open("bitcoin_rate.js", "w")

text_file.write("var btc_usd=" + CADdata + ";\n")
text_file.write("var btc_timestamp=" + timestamp + ";\n")
text_file.write("bitcoin_converter_callback( );\n")

text_file.close()
