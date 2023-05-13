export default function (data: any): FormData {
  var form_data = new FormData();

  for (var key in data) {
    if(data[key]){
      form_data.append(key, data[key]);
    }
  }

  return form_data;
}
