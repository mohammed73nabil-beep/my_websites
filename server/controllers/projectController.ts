import { Request, Response } from 'express';
import db from '../db';
import { deleteFileFromUrl } from '../utils/fileUtils';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const [rows]: any = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    // Parse JSON fields
    const projects = rows.map((p: any) => ({
      ...p,
      features: p.features ? (typeof p.features === 'string' ? JSON.parse(p.features) : p.features) : [],
      gallery: p.gallery ? (typeof p.gallery === 'string' ? JSON.parse(p.gallery) : p.gallery) : []
    }));
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب المشاريع' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [rows]: any = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    const project = rows[0];
    
    if (!project) {
      return res.status(404).json({ error: 'المشروع غير موجود' });
    }
    
    project.features = project.features ? (typeof project.features === 'string' ? JSON.parse(project.features) : project.features) : [];
    project.gallery = project.gallery ? (typeof project.gallery === 'string' ? JSON.parse(project.gallery) : project.gallery) : [];

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء جلب تفاصيل المشروع' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, image, category, price, visits, status, features, gallery } = req.body;
    
    const featuresJson = JSON.stringify(features || []);
    const galleryJson = JSON.stringify(gallery || []);

    const [result]: any = await db.query(
      'INSERT INTO projects (title, description, image, category, price, visits, status, features, gallery) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, image, category, price, visits, status, featuresJson, galleryJson]
    );

    res.status(201).json({ id: result.insertId, message: 'تم إضافة المشروع بنجاح' });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء إضافة المشروع' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, image, category, price, visits, status, features, gallery } = req.body;
    
    // Fetch old project to delete removed images physically from server
    const [rows]: any = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    const oldProject = rows[0];
    
    if (oldProject) {
      // Check if cover image was replaced/removed
      if (oldProject.image && oldProject.image !== image) {
        deleteFileFromUrl(oldProject.image);
      }
      // Check if gallery images were removed
      const oldGallery = oldProject.gallery ? (typeof oldProject.gallery === 'string' ? JSON.parse(oldProject.gallery) : oldProject.gallery) : [];
      const newGallery = gallery || [];
      if (Array.isArray(oldGallery)) {
        oldGallery.forEach((url: string) => {
          if (!newGallery.includes(url)) deleteFileFromUrl(url);
        });
      }
    }

    const featuresJson = JSON.stringify(features || []);
    const galleryJson = JSON.stringify(gallery || []);

    await db.query(
      'UPDATE projects SET title = ?, description = ?, image = ?, category = ?, price = ?, visits = ?, status = ?, features = ?, gallery = ? WHERE id = ?',
      [title, description, image, category, price, visits, status, featuresJson, galleryJson, id]
    );

    res.json({ message: 'تم تحديث المشروع بنجاح' });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء تحديث المشروع' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Fetch project to delete associated images physically
    const [rows]: any = await db.query('SELECT * FROM projects WHERE id = ?', [id]);
    const oldProject = rows[0];
    
    if (oldProject) {
      if (oldProject.image) deleteFileFromUrl(oldProject.image);
      const oldGallery = oldProject.gallery ? (typeof oldProject.gallery === 'string' ? JSON.parse(oldProject.gallery) : oldProject.gallery) : [];
      if (Array.isArray(oldGallery)) {
        oldGallery.forEach((url: string) => deleteFileFromUrl(url));
      }
    }

    await db.query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ message: 'تم حذف المشروع بنجاح' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'حدث خطأ أثناء حذف المشروع' });
  }
};
