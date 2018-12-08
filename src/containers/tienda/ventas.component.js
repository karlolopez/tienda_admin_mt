import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TableWidget from './components/ventas-table-widget/table-widget.component';

const Ventas = (props) => {
  

  return (
    <div>
      <br/>
      <Grid container spacing={0}>
        <Grid item xs={12} >
          <Paper>
            <TableWidget />
            
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    
  };
}


export default compose(connect(mapStateToProps, {}))(Ventas);
