import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric';

const TextEditorCanvas = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeText, setActiveText] = useState(null);

  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('transparent');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [textAlign, setTextAlign] = useState('left');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [lineHeight, setLineHeight] = useState(1.2);
  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    let fabricCanvas;

    if (canvasRef.current) {
      fabricCanvas = new fabric.Canvas(canvasRef.current, {
        height: 600,
        width: 800,
        backgroundColor: '#f9fafb',
      });

      setCanvas(fabricCanvas);

      fabricCanvas.on('selection:created', updateActiveText);
      fabricCanvas.on('selection:updated', updateActiveText);
      fabricCanvas.on('selection:cleared', () => setActiveText(null));
    }

    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
      }
    };
  }, []);

  const updateActiveText = (e) => {
    const obj = e.selected?.[0];
    if (obj && obj.type === 'textbox') {
      setActiveText(obj);
      setFontSize(obj.fontSize);
      setFontColor(obj.fill);
      setBgColor(obj.backgroundColor || 'transparent');
      setIsBold(obj.fontWeight === 'bold');
      setIsItalic(obj.fontStyle === 'italic');
      setIsUnderline(obj.underline);
      setTextAlign(obj.textAlign);
      setFontFamily(obj.fontFamily);
      setLineHeight(obj.lineHeight || 1.2);
      setHasShadow(!!obj.shadow);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (f) {
      fabric.Image.fromURL(f.target.result, (img) => {
        img.set({ selectable: false });
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
      });
    };
    reader.readAsDataURL(file);
  };

  const addText = () => {
    const text = new fabric.Textbox('Edit me', {
      left: 100,
      top: 100,
      fontSize,
      fill: fontColor,
      backgroundColor: bgColor,
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      underline: isUnderline,
      textAlign,
      fontFamily,
      lineHeight,
      shadow: hasShadow ? '2px 2px 2px rgba(0,0,0,0.3)' : '',
    });
    canvas.add(text).setActiveObject(text);
    setActiveText(text);
  };

  const updateTextStyle = () => {
    if (activeText) {
      activeText.set({
        fontSize,
        fill: fontColor,
        backgroundColor: bgColor,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
        underline: isUnderline,
        textAlign,
        fontFamily,
        lineHeight,
        shadow: hasShadow ? '2px 2px 2px rgba(0,0,0,0.3)' : '',
      });
      canvas.renderAll();
    }
  };

  useEffect(() => {
    updateTextStyle();
  }, [fontSize, fontColor, bgColor, isBold, isItalic, isUnderline, textAlign, fontFamily, lineHeight, hasShadow]);

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Specialties</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Add, style, and customize your text on images with ease.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-6">
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded-md"
        />

        <button onClick={addText} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Add Text
        </button>

        <button onClick={downloadImage} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Download
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="p-2 border rounded">
          {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="w-full h-10" />

        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10" />

        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="p-2 border rounded">
          {['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana'].map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>

        <select value={textAlign} onChange={(e) => setTextAlign(e.target.value)} className="p-2 border rounded">
          {['left', 'center', 'right', 'justify'].map((align) => (
            <option key={align} value={align}>{align}</option>
          ))}
        </select>

        <input
          type="number"
          step="0.1"
          value={lineHeight}
          onChange={(e) => setLineHeight(parseFloat(e.target.value))}
          className="p-2 border rounded"
          placeholder="Line Height"
        />

        <button onClick={() => setIsBold((prev) => !prev)} className="p-2 border rounded">
          {isBold ? 'Unbold' : 'Bold'}
        </button>

        <button onClick={() => setIsItalic((prev) => !prev)} className="p-2 border rounded">
          {isItalic ? 'Unitalic' : 'Italic'}
        </button>

        <button onClick={() => setIsUnderline((prev) => !prev)} className="p-2 border rounded">
          {isUnderline ? 'No Underline' : 'Underline'}
        </button>

        <button onClick={() => setHasShadow((prev) => !prev)} className="p-2 border rounded">
          {hasShadow ? 'No Shadow' : 'Shadow'}
        </button>
      </div>

      <div className="border border-gray-300 rounded-md overflow-hidden">
        <canvas ref={canvasRef} className="w-full" />
      </div>
    </div>
  );
};

export default TextEditorCanvas;
