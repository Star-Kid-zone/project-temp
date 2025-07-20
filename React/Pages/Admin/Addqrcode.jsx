// AddQRCode.jsx
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Slider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import { ReactQRCode } from '@lglab/react-qr-code';

const finderStyles = ['square', 'leaf-lg', 'pinched-square', 'circle', 'heart', 'rounded'];
const dataModuleStyles = ['square', 'circle', 'leaf', 'vertical-line', 'box', 'plus'];

const AddQRCode = () => {
  const ref = useRef(null);

  const [qrValue, setQrValue] = useState('http://127.0.0.1:8082/user/userlanding/4');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [finderStyle, setFinderStyle] = useState('square');
  const [finderColor, setFinderColor] = useState('#000000');
  const [moduleStyle, setModuleStyle] = useState('square');
  const [moduleColor, setModuleColor] = useState('#000000');
  const [logo, setLogo] = useState(null);

  const handleDownload = (format) => {
    if (ref.current) {
      ref.current.download({
        name: `custom-qr-code.${format}`,
        format,
        size: 1024,
      });
    }
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Custom QR Code Generator
      </Typography>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="QR Code Value"
                fullWidth
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Size (px)</Typography>
              <Slider value={size} min={100} max={600} onChange={(_, v) => setSize(v)} />
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Margin</Typography>
              <Slider value={margin} min={0} max={20} onChange={(_, v) => setMargin(v)} />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Foreground Color"
                type="color"
                fullWidth
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Background Color"
                type="color"
                fullWidth
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Finder Pattern Style</InputLabel>
                <Select
                  value={finderStyle}
                  onChange={(e) => setFinderStyle(e.target.value)}
                  label="Finder Pattern Style"
                >
                  {finderStyles.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Finder Color"
                type="color"
                fullWidth
                value={finderColor}
                onChange={(e) => setFinderColor(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Data Module Style</InputLabel>
                <Select
                  value={moduleStyle}
                  onChange={(e) => setModuleStyle(e.target.value)}
                  label="Data Module Style"
                >
                  {dataModuleStyles.map((style) => (
                    <MenuItem key={style} value={style}>
                      {style}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Module Color"
                type="color"
                fullWidth
                value={moduleColor}
                onChange={(e) => setModuleColor(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload Logo
                <input hidden accept="image/*" type="file" onChange={handleLogoUpload} />
              </Button>
              {logo && (
                <Typography variant="body2" mt={1}>
                  Logo uploaded ✅
                </Typography>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* QR Code Preview */}
      <Box textAlign="center" mt={6}>
        <ReactQRCode
          ref={ref}
          value={qrValue}
          size={size}
          marginSize={margin}
          background={bgColor}
          dataModulesSettings={{
            style: moduleStyle,
            color: moduleColor,
          }}
          finderPatternInnerSettings={{
            style: finderStyle,
            color: finderColor,
          }}
          finderPatternOuterSettings={{
            style: finderStyle,
            color: finderColor,
          }}
          imageSettings={
            logo
              ? {
                  src: logo,
                  width: 64,
                  height: 64,
                  excavate: true,
                  opacity: 1,
                }
              : undefined
          }
        />
        <Box mt={3} display="flex" justifyContent="center" gap={2}>
          <Button variant="contained" onClick={() => handleDownload('png')}>
            Download PNG
          </Button>
          <Button variant="outlined" onClick={() => handleDownload('svg')}>
            Download SVG
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddQRCode;
