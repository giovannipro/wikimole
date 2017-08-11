#!/usr/bin/env python
# -*- coding: utf-8 -*- 

import os							# get file path
import sys							# reset file encoding
import webbrowser					# open webpages
import urllib, json, io				# read json
from urllib import urlopen			# open file
import datetime						# print time
import csv							# read csv

reload(sys)
sys.setdefaultencoding("utf-8")

csv.field_size_limit(sys.maxsize)

# -----------------------------------
# Utilities

folder = "/Applications/MAMP/htdocs/wikimole/scraper/" #os.path.dirname(os.path.realpath(__file__))
folder_data = "/Applications/MAMP/htdocs/wikimole/data/"
t = "\t"
n = "\n"
s = " "

# -----------------------------------
# Main variables



# -----------------------------------
# Scripts

def time():
	my_format = "%d %m %Y %I:%M%p" 
	ts = datetime.datetime.utcnow().strftime(my_format)
	print(ts)



# -----------------------------------
# Launch script

count_links("articles_details_links_2017") 

