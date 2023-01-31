import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

import Marginals from '../../components/admin_v2/Marginals/Marginals';
import SnackBarAleart from '../../components/admin_v2/Common/SnackBarAleart';
import AuthorsCard from '../../components/admin_v2/AddNew/AuthorCards';
import CategoryCard from '../../components/admin_v2/AddNew/CategoryCard';
import explorer from '../../utils/categoryCard';
import { GraphClient } from '../../config/ApolloClient';
import createSquiggle from '../../graphql/mutations/squiggle/createSquiggle';

const AddNew = ({ allUsers }) => {
  const { push } = useRouter();

  const [content, setContent] = useState('');

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateSquiggleData = () => {
    if (content === '') {
      setError(true);
      setErrorMessage('Please enter the content');
      return;
    }
  };

  const createNewSquiggle = () => {
    validateSquiggleData();

    GraphClient.mutate({
      mutation: createSquiggle,
      variables: {
        squiggleType: 'STANDARD',
        content,
      },
    })
      .then(() => {
        push('/admin_v2/browse');
      })
      .catch(() => {
        setError(true);
        setErrorMessage('Failed to create article');
      });
  };

  return (
    <div>
      {error && (
        <SnackBarAleart
          open={error}
          message={errorMessage}
          setOpen={setError}
          sentStatus={false}
        />
      )}

      <Marginals>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Paper
            component='form'
            sx={{
              p: '2px 4px',
              width: '90%',
            }}
          >
            <InputBase
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ ml: 1, width: '100%', fontSize: '20px', height: '50px' }}
            />
          </Paper>
          <Button
            onClick={createSquiggle}
            variant='contained'
            endIcon={<SendIcon />}
          >
            Add New
          </Button>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Paper
            component='form'
            style={{ width: '50%', marginTop: '5vh', padding: '20px' }}
          >
          </Paper>
        </Box>
      </Marginals>
    </div>
  );
};

export default AddNew;
