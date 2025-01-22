import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  TextareaAutosize,
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import axios from 'axios';

const CreateUpdatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [date, setDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const apiUrl = 'http://localhost:8000/api/articles';

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: any = {};
    if (!title) newErrors.title = 'Title is required';
    if (!summary) newErrors.summary = 'Summary is required';
    if (!date) newErrors.date = 'Date is required';
    if (!publisher) newErrors.publisher = 'Publisher is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const articleData = { title, summary, date, publisher };
        await axios.post(apiUrl, articleData);
        console.log('Article Created:', articleData);

        
        alert('Article successfully submitted!');

        
        setTitle('');
        setSummary('');
        setDate('');
        setPublisher('');

        
        navigate('/display');
      } catch (error) {
        console.error('Error creating/updating article:', error);
        alert('An error occurred while submitting the article.');
      }
    } else {
      
      alert('Please fill in all the required fields.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc', 
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 600,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ marginBottom: 2, color: '#1976d2', fontWeight: 'bold' }}
          >
            News Article By Faris
          </Typography>
          <form onSubmit={handleSubmit}>
            
            <TextField
              fullWidth
              label="Article Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={!!errors.title}
              helperText={errors.title}
              margin="normal"
              variant="outlined"
            />

            
            <Typography variant="body2" sx={{ color: '#555', marginBottom: 1 }}>
              Article Summary
            </Typography>
            <TextareaAutosize
              minRows={5}
              placeholder="Write a brief summary of the article..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{
                width: '100%',
                padding: 12,
                marginBottom: 12,
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: '16px',
              }}
            />
            {errors.summary && (
              <Typography color="error" variant="body2" sx={{ marginBottom: 2 }}>
                {errors.summary}
              </Typography>
            )}

           
            <TextField
              fullWidth
              label="Article Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />

            
            <TextField
              fullWidth
              label="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
              error={!!errors.publisher}
              helperText={errors.publisher}
              margin="normal"
              variant="outlined"
            />

           
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 3,
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#1976d2',
                  color: '#fff',
                  paddingX: 4,
                  paddingY: 1.5,
                  '&:hover': { backgroundColor: '#145a8d' },
                }}
              >
                Submit
              </Button>

             
              <Button
                variant="outlined"
                onClick={() => navigate('/display')}
                sx={{
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  paddingX: 4,
                  paddingY: 1.5,
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                    borderColor: '#145a8d',
                  },
                }}
              >
                Go to Display Page
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateUpdatePage;
