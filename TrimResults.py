import json

with open('wynik.json', 'r') as file:
    data = json.load(file)

filtered_data = [item for item in data if item['Train Name'] != "" and int(item['Average delay'][0]) > 10]
sorted_results = sorted(filtered_data, key=lambda x: int(x['Average delay'][0]))
trimmed_results = [{ "TrainID": item["Train ID"], "TrainName": item["Train Name"], "AverageDelay": item["Average delay"][0] } for item in sorted_results[:5]]

with open('wynik.json', 'w') as file:
    json.dump(trimmed_results, file)