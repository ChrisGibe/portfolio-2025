import Experience from './modules/experience';
import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  new Experience({
    domElement: document.getElementById('container')
  });
  
  console.log('Javascript is loaded !')
})
