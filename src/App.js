import './App.css';
import jsPDF from 'jspdf';    // npm i jspdf
import { useState } from 'react';
import Alert from './components/Alert';
// import Alert from './components/Alert';
const App = () => {

  const [image, setImage] = useState(null)
  const [imageselected, setImageselected] = useState(false)
  const [showalert, setShowAlert] = useState(false)
  const imgeselect = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setImageselected(true);
  }
  const conrtToPdf = (e) => {

    const img = new Image();
    img.src = image;

    img.onload = () => {

      const pdf = new jsPDF('p', 'mm', [img.width, img.height]);

      //check weaher image width is greater tha pdf width or not

      if (img.width > pdf.internal.pageSize.getWidth()) {
        const ratio = pdf.internal.pageSize.getWidth() / img.width;
        const height = img.height * ratio; // Calculate adjusted height
        pdf.addImage(image, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), height); // Use both adjusted width and height
      } else {
        pdf.addImage(image, 'JPEG', 0, 0, img.width, img.height);
      }
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', "Preet's_react_app.pdf"); // Specify the file name for download
      document.body.appendChild(link);
      link.click();

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false)
      }, 1500);


    }
  }

  return (

    <>
      {showalert && <Alert />}
      <div class="dropdown ">
        <button class="btn drop btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Socials
        </button>
        <ul class="dropdown-menu" style={{ backgroundColor: "black", color: "white" }}>
          <li><a class="dropdown-item" href=" https://www.instagram.com/preet_gusain200_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank' rel="noreferrer" style={{ backgroundColor: "black", color: "white" }}>Instagam</a></li>
          <li><a class="dropdown-item" href=" https://www.linkedin.com/in/preet-gusain-986b022a5" target='_blank' rel="noreferrer" style={{ backgroundColor: "black", color: "white" }}>LinkedIN</a></li>
          <li><a class="dropdown-item" href="https://github.com/preetcoder07" target='_blank' rel="noreferrer" style={{ backgroundColor: "black", color: "white" }}>Github</a></li>
        </ul>
      </div>
      <div className='container_all'>
        <div className='container'>
          <p> 💚  𝕀𝕞𝕒𝕘𝕖 𝕥𝕠 ℙ𝔻𝔽 💚 </p>
        </div>
        <div className='container'>
          <input className='input' placeholder='bankai' type='file' onChange={imgeselect} />
        </div>

        {imageselected && (
          <>
            <div className='container imgsel'>
              <img src={image} alt="" style={imageselected ? { border: "2px solid white" } : {}} />
            </div>
            <div className='container imgsel' >
              <p2>ɪᴍᴀɢᴇ ꜱᴇʟᴇᴄᴛᴇᴅ</p2>
            </div>
            <div className='container imgsel'>
              <button type="button" class="btn btn-outline-success btn2" onClick={conrtToPdf}  >𝔻𝕠𝕨𝕟𝕝𝕠𝕒𝕕</button>

            </div>
          </>
        )}

        <fotter />
      </div >

    </>
  );
}

export default App;
