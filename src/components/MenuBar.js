import { Breadcrumbs, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { sidebarRoutes as routes} from "../routes";

const MenuBar = ({ match }) => {

  const useStyles = makeStyles({
    menu: {
      padding: '10px',
    }
  });
  const classes = useStyles();

  const menuInfo = useMemo(() => {
    let result = {};
    routes.forEach(route => {
      const { children, id, group } = route;
      if(children && Object.keys(result).length === 0){
        children.some(child => {
          if(match.path === child.path){
            result = { group: group, parent: id, name: child.name }
          }
        })
      }
    });
    return result;
  }, [match]);
  const { group, parent, name } = menuInfo;

  return (
    <Grid item>
      <Helmet title={name} />
      <Typography variant="h3" gutterBottom display="inline">
        {name}
      </Typography>
      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>{group}</Typography>
        <Typography>{parent}</Typography>
        <Typography>{name}</Typography>
      </Breadcrumbs>
    </Grid> 
  )
}

export default MenuBar;