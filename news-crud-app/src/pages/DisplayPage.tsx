import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, ListItemText, Typography, Button, Pagination, TextField,} from '@mui/material';
import axios from 'axios';

const DisplayPage: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = 'http://localhost:8000/api/articles';

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#d3d3d3', // Gray background
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 700,
          width: '100%',
          padding: 2,
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: '#333', fontWeight: 700, textAlign: 'center' }}
        >
          News Articles
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="subtitle1" sx={{ color: '#555', fontWeight: 500 }}>
            Total Articles: {filteredArticles.length}
          </Typography>
          <Button
            onClick={fetchArticles}
            sx={{
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#007bff',
              color: '#fff',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#0056b3' },
            }}
          >
            Refresh
          </Button>
        </Box>

        <TextField
          label="Search Articles"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            marginBottom: 2,
            backgroundColor: '#ffffff',
            borderRadius: '4px',
            '& .MuiInputBase-root': { backgroundColor: '#ffffff' },
          }}
        />

        {loading ? (
          <Typography variant="h6" align="center" sx={{ color: '#007bff' }}>
            Loading...
          </Typography>
        ) : (
          <List>
            {currentArticles.length > 0 ? (
              currentArticles.map((article) => (
                <ListItem
                  key={article.id}
                  sx={{
                    borderBottom: '1px solid #ddd',
                    padding: 2,
                    backgroundColor: '#fff',
                    borderRadius: '4px',
                    marginBottom: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ color: '#333', fontWeight: 600 }}>
                        {article.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ color: '#777', marginBottom: 1 }}>
                          {article.summary}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: '#007bff', fontWeight: 500 }}
                        >
                          Published by {article.publisher} on {article.date}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(article.id)}
                    sx={{
                      fontSize: '12px',
                      marginLeft: 2,
                      textTransform: 'none',
                    }}
                  >
                    Delete
                  </Button>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" align="center" sx={{ color: '#999' }}>
                No articles found.
              </Typography>
            )}
          </List>
        )}

        <Pagination
          count={Math.ceil(filteredArticles.length / articlesPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          sx={{
            marginTop: 3,
            display: 'flex',
            justifyContent: 'center',
          }}
        />

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            sx={{
              marginTop: 2,
              borderColor: '#007bff',
              color: '#007bff',
              '&:hover': {
                backgroundColor: '#e3f2fd',
                borderColor: '#0056b3',
                color: '#0056b3',
              },
            }}
          >
            Back to Create / Update
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default DisplayPage;
