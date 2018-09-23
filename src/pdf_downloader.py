from link_crawler import *
import sys
from tqdm import tqdm

class pdf_downloader:
    def __init__(self, download_links, save_path, year):
        self.urls = download_links
        self.save_path = os.path.join(save_path, year)

    def _file_write(self, url):
        file_name = re.search('papers/(.+)',url).group(1)
        url_content = requests.get(url, stream = True)
        pdf_path = os.path.join(self.save_path, file_name)

        with open(pdf_path, 'wb') as pdf:
            for chunk in url_content.iter_content(chunk_size = 1024):
                if chunk:
                    pdf.write(chunk)

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

    crawler = linkCrawler(web_link, year)
    pdf_urls = crawler.find_urls()

    downloader = pdf_downloader(pdf_urls, destination, year)
    downloader.download_pdf()


if __name__ == '__main__':
    main()
