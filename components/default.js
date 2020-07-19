const compressing = require('compressing');
const path = require("path");
const child_process = require('child_process');
const fs = require('fs');

//SHOW CARD
function showCard(image,name,info,icon,div_tag,click){
  //Get card value
  this.cardimg = image;
  this.cardname = name;
  this.cardinfo = info;
  this.cardicon = icon;

  //HTML
  var userCard = '<div onclick="editStudent('+click+')" class="user-card waves-effect waves-dark">'
+'			<div class="user-img" style="background-image:url({IMAGE})">'
+'			</div>'
+'			<div class="user-name">'
+'				{NAME}'
+'			</div>'
+'			<div class="user-badge">'
+'				<a class="user-badge-content">{CLASS}</a>'
+'			</div>'
+'			<button class="user-btn">'
+'				<a class="user-btn-content">View Profile</a>'
	+'		</button>'
	+'	</div>'
  var userCards = '<div onclick="editp('+click+')" class="student-card" id="student-card">'
    +'  <div class="card-image waves-effect waves-light" id="card-image">'
    +'    <img class="card-avatar" src="{IMAGE}"/>'
    +'    </div>'
    +'    <div class="card-title" id="card-title">'
    +'      <a class="card-name" id="card-name">{NAME}</a>'
    +'      <a class="card-class" id="card-class">{CLASS}</a>'
    +'      </div>'
    +'      <div class="card-action" id="card-action">'
    +'        <i class="material-icons">{ICON}</i>'
    +'      </div>'
    +'</div>'

    //APPEND TO HTML
    userCard = userCard.replace("{NAME}",name);
    userCard = userCard.replace("{CLASS}",info);
    image = image.replace(/\\/g, "\\\\");
    userCard = userCard.replace("{IMAGE}",image);
    userCard = userCard.replace("{ICON}",icon);

    $(div_tag).append(userCard);
};

//SAVE FILE FUNCTION

function save(){
  const {dialog} = require('electron').remote
  const fsx = require('fs-extra');
  dialog.showSaveDialog({ filters: [
      {
        name: 'iSchool Database',
        extensions: ['asx']
      }
     ]}, function (fileName) {

      var filenames = path.basename(fileName); //lấy tên file
      //copy to temp
      fsx.copy(process.env.APPDATA + "/minhducschool/database.json",process.env.APPDATA + "/minhducschool/temp/database.json");
      fsx.copy(process.env.APPDATA + "/minhducschool/database.json.bak",process.env.APPDATA + "/minhducschool/temp/database.json.bak");
      fsx.copy(process.env.APPDATA + "/minhducschool/information.json",process.env.APPDATA + "/minhducschool/temp/information.json");
      fsx.copy(process.env.APPDATA + "/minhducschool/database",process.env.APPDATA + "/minhducschool/temp/database");
      //compress
      compressing.tar.compressDir(process.env.APPDATA + "/minhducschool/temp", fileName)
      .then()
      .catch();
      //copy to location
      console.log(filenames);
      console.log(fileName);
  });
};

//REFRESH pages
function refresh(id,file){
  $(id).load(file);
}
