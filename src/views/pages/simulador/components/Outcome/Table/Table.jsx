import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const CustomTable = ({ className, headers, rowData }) => {
  return (
    <TableContainer component={Paper}>
      <Table className={className}>
        <TableHead>
          <TableRow>
            {headers.map(({ name, align }, index) => (
              <TableCell key={index} align={align}>
                {name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row, index1) => {
            return (
              <TableRow key={index1}>
                {Object.keys(row.value).map((key, index2) => {
                  return (
                    <TableCell
                      component={row.value[key === 'component' ? 'component' : '']}
                      scope={row.value[key === 'scope' ? 'scope' : '']}
                      align={row.align}
                      key={index2}
                    >
                      {row.value[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomTable.propTypes = {
  className: PropTypes.any,
  headers: PropTypes.array.isRequired,
  rowData: PropTypes.array.isRequired,
};

export default CustomTable;
