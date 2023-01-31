import React, { useState, useEffect } from 'react';

// Material UI
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Marginals from '../../components/admin_v2/Marginals/Marginals';
import { GraphClient } from '../../config/ApolloClient';
import listSquiggles from '../../graphql/queries/squiggle/listSquiggles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const browseSquiggles = ({ squiggles }) => {
  const [_squiggles, setSquiggles] = useState(squiggles);
  const [row, setRow] = useState([]);
  const [page, setPage] = useState(0);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const rowData = _squiggles?.map(
      ({
        id,
        content
      }) => {
        const squiggleContent = squiggles?.map((id) => content).join(', ');
        return {
          id,
          content,
        };
      },
    );
    if (rowData) setRow(rowData);
  }, [squiggles, _squiggles]);

  useEffect(() => {
    (async () => {
      const {
        data: { listSquiggles: squiggles },
      } = await GraphClient.query({
        query: listSquiggles,
        variables: { limit: 25, offset: 25 * page },
      });
      setSquiggles(squiggles);
    })();
  }, [page]);

  return (
    <div>
      <Marginals>
        <Button>
          Create Squiggle
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ minWidth: '300px' }}>
                  Squiggle Content
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row?.map(
                ({
                  id,
                  content
                }) => (
                  <StyledTableRow key={id}>
                    <StyledTableCell scope='row'>
                      {content}
                      <br />
                      <br />                      
                    </StyledTableCell>
                  </StyledTableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component={Paper}
          rowsPerPageOptions={[25]}
          //count={totalArticles}
          rowsPerPage={25}
          page={page}
          onPageChange={handleChangePage}
        />
      </Marginals>
    </div>
  );
};

export default browseSquiggles;
