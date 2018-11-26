import os
import re
import sys
import json
import requests
from pyspark import SparkContext

class Word_Frequency:
    '''A class that calculates word frequency for cvpr metadata using spark.'''
    def __init__(self, data):
        self.data = data
        self.sc = SparkContext()
    
    def _get_category_list(self, category = 'title'):
        result = []
        for item in self.data['cvpr']:
            if category in item:
                result.append(item[category])
        return result
    
    def get_wc(self, category):
        '''
            get the word count for a specific category in metadata.
            argv:
                category : One category in data that needs to construct word count list.
                
                e.g. 
                data = {'cvpr': 
                [{'subject': '2013 IEEE Conference on Computer Vision and Pattern Recognition',
                   'links': 'http://openaccess.thecvf.com/content_cvpr_2014/papers/Cheng_Fast_and_Accurate_2014_CVPR_paper.pdf',
                   'pages': 8,
                   'title': 'Fast and Accurate Image Matching with Cascade Hashing for 3D Reconstruction',
                   'year': 2014,
                   'author': 'Jian Cheng, Cong Leng, Jiaxiang Wu, Hainan Cui, Hanqing Lu'},
                  {'subject': '2013 IEEE Conference on Computer Vision and Pattern Recognition',
                   'links': 'http://openaccess.thecvf.com/content_cvpr_2014/papers/Hartmann_Predicting_Matchability_2014_CVPR_paper.pdf',
                   'pages': 8,
                   'title': 'Predicting Matchability',
                   'year': 2014,
                   'author': 'Wilfried Hartmann, Michal Havlena, Konrad Schindler'}...
                ]
                }
                
                category = 'title'
                wf = Word_Frequency(data)
                title_wc_list = wf.get_wc(category = category)
                # title_wc_list = ['fast:10', 'image:20', 'cnn:200', ...]
        '''
        try:
            category_list = self._get_category_list(category)
            parallel_data = self.sc.parallelize(category_list, 5)
            result = parallel_data.flatMap(lambda s : s.split()).\
                                      map(lambda w : re.sub(r'[/,#$.?!:"<>();&-]', '', w)).\
                                      map(lambda w : w.lower()).\
                                      map(lambda w : (w, 1)).\
                                      reduceByKey(lambda a, b : a + b).filter(lambda U : len(U[0]) >= 1).\
                                      map(lambda U : str(U[0])+':'+str(U[1])).collect()
            return result
        except ValueError:
            print(str(ValueError))
        except IOError:
            print(str(IOError))
        except Exception as e:
            print(str(e))
        finally:
            self.sc.stop()