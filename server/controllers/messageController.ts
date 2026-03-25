import { Request, Response } from 'express';
import db from '../db';

export const getMessages = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب الرسائل' });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    const [result]: any = await db.query(
      'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    res.status(201).json({ id: result.insertId, message: 'تم استلام رسالتك بنجاح' });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'حدث خطأ في إرسال الرسالة' });
  }
};
