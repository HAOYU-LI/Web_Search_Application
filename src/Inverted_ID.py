import os
import re
import sys
import json

class Inverted_ID:
    """
        A class that constructs the inverted index for cvpr metadata.
        input:
            dic : A dictionary that stores the cvpr research papers. e.g.
                {'cvpr': 
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
    """
    
    def __init__(self, dic):
        self.word_lst = dic['cvpr']
        self.inverted_idx = {}
        self._construct_idx()

        
        
    def _construct_idx(self):
        
        for i in range(len(self.word_lst)):
            cur_dict = self.word_lst[i]
            
            if 'subject' in cur_dict:
                self._add(cur_dict['subject'], i)
            
            #if 'pages' in cur_dict:
            #    self._add(cur_dict['pages'], i)
            
            #if 'year' in cur_dict:
            #    self._add(cur_dict['year'], i)
            
            if 'author' in cur_dict:
                self._add(cur_dict['author'], i)
                
                
    
    def _add(self, words, index):
        for word in str(words).split():
            word = re.sub(r'[/,#$.?!"<>();&-]', '', word)
            word = word.lower()
            
            if word.isdigit() or len(word) <= 1:
                continue
                        
            if word not in self.inverted_idx:
                self.inverted_idx[word] = set()
            self.inverted_idx[word].add(index)
            
    
    def search(self, words, vis = True):
        """
            return a index list where each record of that index contains the words.
            input:
                words : A word list to search.
                vis : If True: print the records out.
            
            return:
                List of index.
        """
        result_lst = set()
        words = words.split()
        
        for word in words:
            word = re.sub(r'[/,#$.?!"<>();&-]', '', word)
            word = word.lower()
            if word in self.inverted_idx:
                for idx in self.inverted_idx[word]:
                    result_lst.add(idx)
        
        #print(result_lst)
        if vis:
            for ele in result_lst:
                print(self.word_lst[ele])
        
        return list(result_lst)
    
    def get_inverted_idx(self):
        return self.inverted_idx
