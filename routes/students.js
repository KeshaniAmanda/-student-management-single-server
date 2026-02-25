import express from 'express';
import { db } from '../config/firebase.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
const studentsCollection = db.collection('students');

// Apply authentication middleware to all routes
router.use(verifyToken);

// CREATE - Add new student
router.post('/', async (req, res) => {
  try {
    const { name, email, age, course, phoneNumber } = req.body;

    if (!name || !email || !age || !course) {
      return res.status(400).json({ 
        error: 'Name, email, age, and course are required' 
      });
    }

    const studentData = {
      name,
      email,
      age: parseInt(age),
      course,
      phoneNumber: phoneNumber || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: req.user.uid
    };

    const docRef = await studentsCollection.add(studentData);

    res.status(201).json({
      id: docRef.id,
      ...studentData
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// READ - Get all students
router.get('/', async (req, res) => {
  try {
    const snapshot = await studentsCollection
      .orderBy('createdAt', 'desc')
      .get();

    const students = [];
    snapshot.forEach(doc => {
      students.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(students);
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// READ - Get single student
router.get('/:id', async (req, res) => {
  try {
    const doc = await studentsCollection.doc(req.params.id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({
      id: doc.id,
      ...doc.data()
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// UPDATE - Update student
router.put('/:id', async (req, res) => {
  try {
    const { name, email, age, course, phoneNumber } = req.body;
    const studentRef = studentsCollection.doc(req.params.id);

    const doc = await studentRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const updateData = {
      updatedAt: new Date().toISOString()
    };

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (age) updateData.age = parseInt(age);
    if (course) updateData.course = course;
    if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;

    await studentRef.update(updateData);

    const updatedDoc = await studentRef.get();
    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// DELETE - Delete student
router.delete('/:id', async (req, res) => {
  try {
    const studentRef = studentsCollection.doc(req.params.id);
    
    const doc = await studentRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await studentRef.delete();
    
    res.json({ 
      message: 'Student deleted successfully',
      id: req.params.id 
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

export default router;
