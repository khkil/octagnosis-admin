import { Breadcrumbs, Grid, Link, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { commonLayoutRoutes } from '../../routers';
import { getDynamicPath } from '../../utils';

const CommonBreadcrumbs = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const recentMenuList = useMemo(() => {
    let menuList = [];
    commonLayoutRoutes.forEach(({ path, children }) => {
      children &&
        children.forEach(child => {
          const currentPath = getDynamicPath(`/${path}${child.path && `/${child.path}`}`, params);
          const includePath = pathname.indexOf(currentPath) > -1;
          if (includePath) {
            const menu = {
              title: child.name,
              path: currentPath,
            };
            console.log(currentPath, includePath, menu);
            menuList.push(menu);
          }
        });
    });
    return menuList;
  }, [pathname]);

  const moveMenu = path => {
    navigate(path);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h5">
          {recentMenuList.find(({ title, path }) => path === pathname) &&
            recentMenuList.find(({ title, path }) => path === pathname).title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          {recentMenuList.map(({ title, path }, index) =>
            path === pathname ? (
              <Typography key={index} color="primary">
                {title}
              </Typography>
            ) : (
              <Link
                key={index}
                underline="hover"
                color="inherit"
                href="/"
                onClick={e => {
                  e.preventDefault();
                  moveMenu(path);
                }}
              >
                <Typography key={index}>{title}</Typography>
              </Link>
            ),
          )}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default CommonBreadcrumbs;
