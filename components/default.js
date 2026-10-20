const compressing = require('compressing');
const path = require('path');
const fs = require('fs');

//SHOW CARD
function showCard(image,name,info,icon,div_tag,click){
  const avatarPlaceholder = './resources/icons/avatar-placeholder.svg';
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
    const card = userCards
      .replace("{NAME}", name)
      .replace("{CLASS}", info)
      .replace("{IMAGE}", avatarPlaceholder)
      .replace("{ICON}", icon);

    $(div_tag).append(card);
};

//SAVE FILE FUNCTION

async function save() {
  const { dialog } = require('@electron/remote');
  const fsx = require('fs-extra');
  const appData = require('@electron/remote').app.getPath('appData');

  if (!appData) {
    console.error('Cannot locate the application data directory.');
    return;
  }

  const result = await dialog.showSaveDialog({
    filters: [{ name: 'iSchool Database', extensions: ['asx'] }]
  });
  const fileName = typeof result === 'string' ? result : result.filePath;
  if (!fileName) return;

  const dataDir = path.join(appData, 'minhducschool');
  const tempDir = path.join(dataDir, 'temp');
  const entries = ['database.json', 'database.json.bak', 'information.json', 'database'];

  try {
    await fsx.ensureDir(tempDir);
    for (const entry of entries) {
      const source = path.join(dataDir, entry);
      if (await fsx.pathExists(source)) {
        await fsx.copy(source, path.join(tempDir, entry));
      }
    }
    await compressing.tar.compressDir(tempDir, fileName);
  } catch (error) {
    console.error('Failed to export the iSchool database:', error);
  } finally {
    await fsx.remove(tempDir).catch(error => {
      console.error('Failed to clean up temporary export files:', error);
    });
  }
}

//REFRESH pages
function refresh(id,file){
  $(id).load(file);
}
