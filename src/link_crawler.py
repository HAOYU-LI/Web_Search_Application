import re
import numpy as np
import requests
import os
from bs4 import BeautifulSoup

class linkCrawler:
    def __init__(self, web_link, year):
        self.web_link = web_link
        self.year = year
        self.pattern = 'content_cvpr_' + str(year) + '/papers/'
        self.urls = None

    def match(self, string):
        lenPattern = len(self.pattern)
        lenString = len(string)

        if(lenString < lenPattern):
            return False

        result = False
        count = 0
        for char in string:
            if char == self.pattern[count]:
                count += 1
            elif char != self.pattern[count]:
                if char == self.pattern[0]:
                    count = 1
                else:
                    count = 0

            if count == lenPattern:
                result = True
                break
        return result

    def find_urls(self):
        page=requests.get(self.web_link).text.split('\n')
        self.urls = list()
        for ele in page:
            if self.match(ele):
                paperName = re.search('href=(.+)>pdf', ele).group(1)
                paperLink = 'http://openaccess.thecvf.com/' + paperName[1:len(paperName) - 1]
                self.urls.append(paperLink)
        return self.urls
