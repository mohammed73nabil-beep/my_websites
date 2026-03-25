import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'الرجاء اختيار صورة' });
    }

    // Get compression quality from request body (default: 80)
    const qualityStr = req.body.quality || '80';
    const quality = parseInt(qualityStr, 10);

    // Process image with sharp: resize if too large, convert to webp with quality, return buffer
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 1920, height: 1080, fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();

    // Convert to Base64 Data URI
    const base64Image = `data:image/webp;base64,${buffer.toString('base64')}`;

    res.status(200).json({ 
      url: base64Image, 
      message: 'تم ضغط وحفظ الصورة في قاعدة البيانات بنجاح',
      originalSize: req.file.size,
      newSize: buffer.length
    });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء معالجة الصورة' });
  }
};
