
function post_create()
{
    let student_name = document.getElementById('student_name').value;
    let father_name = document.getElementById('father_name').value;
    let age = document.getElementById('age').value;
    let roll_no = document.getElementById('roll_no').value;

    axios.post('https://pacific-coast-71393.herokuapp.com/user', {
        student_name: student_name,father_name:father_name
        ,age:age,roll_no:roll_no
          })
      .then(function (response) {
        console.log(response);
        alert(response.data)
        document.getElementById('student_name').value='';
        document.getElementById('father_name').value='';
        document.getElementById('age').value='';
        document.getElementById('roll_no').value='';    
        get_all();
      })
      .catch(function (error) {
        console.log(error);
      });
}

function get_all(){
    axios.get('https://pacific-coast-71393.herokuapp.com/users')
  .then(function (response) {
      $html='';
    console.log(response);
    var i=0;
    response.data.forEach(function(data) {
        if(data.student_name != undefined){
        $html += '<tr>';
        $html += '<td id="student_name_'+i+'"> '+data.student_name+'</td>';
        $html += '<td id="father_name_'+i+'"> '+data.father_name+'</td>';
        $html += '<td id="age_'+i+'"> '+data.age+'</td>';
        $html += '<td id="roll_no_'+i+'"> '+data.roll_no+'</td>';
        $html += '<td><a href="javascript:void(0)" onclick="get_record(this);" id='+i+'>View</td>';
        $html += '</tr>';
        }
        i++;
    });
    console.log($html);
    console.log(document.getElementById('tblper'));
    document.getElementById('tblper').innerHTML = $html;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}
function get_record($obj){
    var id = $obj.getAttribute('id');
    id = parseInt(id);
    let student_name = document.getElementById('student_name_'+id).innerHTML;
    let father_name = document.getElementById('father_name_'+id).innerHTML;
    let age = document.getElementById('age_'+id).innerHTML;
    let roll_no = document.getElementById('roll_no_'+id).innerHTML;

    console.log(student_name,father_name,id,document.getElementById('student_name_'+id));

    document.getElementById('student_name').value=student_name;
    document.getElementById('father_name').value=father_name;
    document.getElementById('age').value=age;
    document.getElementById('roll_no').value=roll_no;        
    document.getElementById('student_id').value=id;        
}

function update_student(){
  let student_name = document.getElementById('student_name').value;
  let father_name = document.getElementById('father_name').value;
  let age = document.getElementById('age').value;
  let roll_no = document.getElementById('roll_no').value;

  let id = document.getElementById('student_id').value;
  axios.put('https://pacific-coast-71393.herokuapp.com/user/'+id, {
    student_name: student_name,father_name:father_name
    ,age:age,roll_no:roll_no
})
  .then(response => {
    alert("User Updated");
    get_all();

  })
  .catch(error => {
    console.log(err);
  });
}
function delete_student(){
    let id = document.getElementById('student_id').value;
    axios.delete('https://pacific-coast-71393.herokuapp.com/user/'+id)
  .then(function (response) {
    console.log(response);
    alert(response.data)
    get_all();
})
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });    
}

$(function() {
  get_city();
});

function get_city(){
  axios.post('https://countriesnow.space/api/v0.1/countries/cities', {
    "country": "pakistan"
      })
  .then(function (response) {
    console.log(response);
    $html = '<option value="">Select City</option>';
    response.data.data.forEach(function(data) {
      $html += '<option value="'+data+'">'+data+'</option>'
    })
    document.getElementById('city_id').innerHTML = $html;

  })
  .catch(function (error) {
    console.log(error);
  });
}

function getWeather() {

  const cityName = document.getElementById("city_id").value

  axios.get('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=363a0329911c1b074081245aae1023c3&units=metric')

      .then(function (response) {
          console.log(response);
          console.log(response.data);

          document.getElementById("temp").innerText = response.data.main.temp;
          document.getElementById("feels_like").innerText = response.data.main.feels_like;
          document.getElementById("humidity").innerText = response.data.main.humidity;
          document.getElementById("description").innerText = response.data.weather[0].description;

        })
}