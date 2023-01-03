import React, { useEffect, useMemo, useState } from 'react';
import { Delete, StarBorder, Upload } from '@mui/icons-material';
import { Box, Button, IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FTP_URL } from '../../constants';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16,
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  boxSizing: 'border-box',
};

const img = {
  display: 'block',
  width: 200,
  height: 200,
};

const FileUploadDropzone = ({ filePath, onDrop, onDelete }) => {
  const files = filePath ? filePath : [];
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => {
      onDrop(files);
    },
  });

  const thumbs = files.map(({ name, path }, index) => (
    <div style={thumb} key={index}>
      <ImageListItem>
        <img src={`${FTP_URL}/${path}`} style={img} loading="lazy" />
        <ImageListItemBar
          sx={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
          }}
          title={name}
          position="top"
          actionIcon={
            <IconButton
              sx={{ color: 'white' }}
              aria-label={`star ${name}`}
              onClick={() => {
                onDelete(index);
              }}
            >
              <Delete color="error" />
            </IconButton>
          }
          actionPosition="right"
        />
      </ImageListItem>
    </div>
  ));

  useEffect(() => {
    //files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <Box mt={2}>
      <Button {...getRootProps({ className: 'dropzone' })} variant="contained" color="info" startIcon={<Upload />}>
        <input {...getInputProps()} />
        업로드
      </Button>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </Box>
  );
};

export default FileUploadDropzone;
