import scrapy

class TrainSpider(scrapy.Spider):
    name = "train"
    start_urls = ['http://bocznica.eu/trains']
    allowed_domains = ['bocznica.eu']

    def parse(self, response):
        for row in response.xpath('//table//tr')[1:]:
                if len(row.xpath('td//text()')[1].extract().split()) > 2:
                    trains = {
                        #'Number': row.xpath('td//text()')[0].extract(),
                        'Train ID': row.xpath('td//text()')[1].extract().split()[1],
                        'Train Name': row.xpath('td//text()')[1].extract().split()[2],
                        #"Route": row.xpath('td//text()')[2].extract() + "-" + row.xpath('td//text()')[3].extract(),
                        "Average delay": row.xpath('td//text()')[4].extract().split(),
                    }
                else:
                    trains = {
                        #'Number': row.xpath('td//text()')[0].extract(),
                        'Train ID': row.xpath('td//text()')[1].extract().split()[1],
                        'Train Name': '',
                        #"Route": row.xpath('td//text()')[2].extract() + "-" + row.xpath('td//text()')[3].extract(),
                        "Average delay": row.xpath('td//text()')[4].extract().split(),
                    }

                follow_train = 'http://bocznica.eu' + row.xpath('td//a').attrib['href']
                yield response.follow(follow_train, callback=self.parse_second, meta={'item': trains})

    def parse_second(self, response):
        item = response.meta['item']
        stations = []
        avg_d1 = []
        avg_d2 = []
        avg_d3 = []
        amenities = []
        for row in response.xpath('//table//tr')[4:-2]:
            try:
                stations.append(row.css('a::text')[0].extract().strip().replace(' ', ' '))
                avg_d1.append(int(row.css('td::text')[4].extract()))
                avg_d2.append(int(row.css('td::text')[5].extract()))
                avg_d3.append(int(row.css('td::text')[6].extract()))
            except IndexError:
                continue
            except ValueError:
                continue
        #for row in response.css('td.wag'):
        #    for i in range(0, len(row.css('img ::attr(title)').extract())):
        #        if row.css('img ::attr(title)').extract()[i] not in amenities:
        #            amenities.append(row.css('img ::attr(title)').extract()[i])

        res = 0
        for val in avg_d1:
            res += val
        res = res/len(avg_d1)
        item['D-1'] = int(res)
        
        for val in avg_d2:
            res += val
        res = res/len(avg_d1)
        item['D-2'] = int(res)

        for val in avg_d3:
            res += val
        res = res/len(avg_d1)
        item['D-3'] = int(res)

        #item['Amenities'] = amenities
        #item['Stations'] = stations

        #if "Kraków Główny" in stations:
        if "Dębica" in stations:
            yield item
