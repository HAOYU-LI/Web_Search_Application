from PyPDF2 import PdfFileReader
import os
import sys
import json

class json_creater:
	def __init__(self, json_path):
		self.json_path = json_path

	def _get_info(self, pdf_path):

		if not os.path.isfile(pdf_path):
			raise Exception('Invalid pdf path')
			sys.exit()

		with open(pdf_path, 'rb') as f:
			pdf = PdfFileReader(f)
			info = pdf.getDocumentInfo()
			number_of_pages = pdf.getNumPages()

		return info, number_of_pages

	def write_json(self, pdf_path, pdf_link):

		try:
			info, pages = self._get_info(pdf_path)
			pdf_obj = {}

			if '/Subject' in info:
				pdf_obj['subject'] = info['/Subject']
				pdf_obj['year'] = int(info['/Subject'][0:4])
			if '/Author' in info:
				pdf_obj['author'] = info['/Author']
			if '/Title' in info:
				pdf_obj['title'] = info['/Title']

			pdf_obj['pages'] = pages
			pdf_obj['links'] = pdf_link
			

			if not os.path.isfile(self.json_path):
				root = {"cvpr" : []}
				root["cvpr"].append(pdf_obj)

				with open(self.json_path, 'w+') as f:
					json.dump(root, f)
			else:
				with open(self.json_path, 'r+') as f:
					json_data = json.load(f)

				json_data['cvpr'].append(pdf_obj)

				with open(self.json_path, 'w+') as f:
					json.dump(json_data, f)


		except Exception as e:
			print (str(e))
