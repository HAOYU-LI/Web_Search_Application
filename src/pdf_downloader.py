from link_crawler import *
from json_creater import *
import sys
from tqdm import tqdm

class pdf_downloader:
    """
        A class that is used for downloading CVPR pdf files.
        usage :

        web_link = sys.argv[1]
        year = re.search('CVPR(.*).py', web_link).group(1)
        destination = sys.argv[2]
        json_path = sys.argv[3]


        crawler = linkCrawler(web_link, year)
        pdf_urls = crawler.find_urls()

        downloader = pdf_downloader(pdf_urls, destination, year, json_path, False)
        downloader.download_pdf()
    """

    def __init__(self, download_links, save_path, year, json_path = '../data/metadata.json', create_json = True):
        """
        input:
            download_links : The links of cvpr open repository for any year
            save_path : destination for saving crawled pdf files, format : save_path/[year]/pdf_files
            year : given year for saving file purpose
            json_path : if create_json = True, input this json_path to extract metadata for these pdf files.
            create_json : if true, extract metadata for pdf files and need to provide json_path
        """
        self.urls = download_links
        self.save_path = os.path.join(save_path, year)
        self.json_path = json_path
        self.js_creater = json_creater(json_path)
        self.create_json = create_json

    def _file_write(self, url):
        file_name = re.search('papers/(.+)',url).group(1)
        url_content = requests.get(url, stream = True)
        pdf_path = os.path.join(self.save_path, file_name)

        if not os.path.exists(pdf_path):
            with open(pdf_path, 'wb') as pdf:
                for chunk in url_content.iter_content(chunk_size = 1024):
                    if chunk:
                        pdf.write(chunk)
            #write metadata to json_file
            #print(pdf_path)

        if self.create_json:
            self.js_creater.write_json(pdf_path, url)

    def download_pdf(self):
        if self.urls is None or len(self.urls) == 0:
            print('urls invalid')
            sys.exit()

        if not os.path.isdir(self.save_path):
            os.mkdir(self.save_path)

        for i in tqdm(range(len(self.urls))):
            self._file_write(self.urls[i])


def main():
    if len(sys.argv) <= 1:
        print("Should input web link")
        sys.exit()

    if len(sys.argv) <= 2:
        print("Should input destination")
        sys.exit()

    web_link = sys.argv[1]
    year = re.search('CVPR(.*).py', web_link).group(1)
    destination = sys.argv[2]
    json_path = None

    if len(sys.argv) == 4 :
        json_path = sys.argv[3]


    crawler = linkCrawler(web_link, year)
    pdf_urls = crawler.find_urls()

    downloader = pdf_downloader(pdf_urls, destination, year, create_json = False)
    if json_path is not None:
        downloader = pdf_downloader(pdf_urls, destination, year, json_path, create_json = True)

    downloader.download_pdf()


if __name__ == '__main__':
    main()
