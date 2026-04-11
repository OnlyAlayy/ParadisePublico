require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const videoDir = path.join(__dirname, '..', 'videosslider');
const files = fs.readdirSync(videoDir).filter(f => f.endsWith('.mp4'));

async function uploadVideos() {
  console.log('Empezando subida de videos a Cloudinary...');
  const uploadedUrls = [];
  
  for (const file of files) {
    const filePath = path.join(videoDir, file);
    console.log(`Subiendo ${file}... (puede tardar un ratito)`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
        folder: "paradise_slider",
        // Comprimir video automáticamente preservando calidad
        quality: "auto",
        width: 1280, // Limitar a 720p máximo (ahorra espacio)
        crop: "scale",
      });
      console.log(`✔ Terminado: ${result.secure_url}`);
      uploadedUrls.push(result.secure_url);
    } catch (err) {
      console.error(`Error subiendo ${file}:`, err);
    }
  }
  
  console.log('\n--- URLs PARA EL VIDEOSLIDER ---');
  uploadedUrls.forEach(url => console.log(`"${url}",`));
}

uploadVideos();
