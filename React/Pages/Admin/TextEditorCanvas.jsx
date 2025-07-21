import React, { useEffect, useRef, useState } from 'react';
import * as fabric from 'fabric'; 

const TextEditorCanvas = () => {
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [activeText, setActiveText] = useState(null);
  const [fontSize, setFontSize] = useState(20);
  const [fontColor, setFontColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

useEffect(() => {
  let fabricCanvas;

  if (canvasRef.current) {
    fabricCanvas = new fabric.Canvas(canvasRef.current, {
      height: 600,
      width: 800,
      backgroundColor: '#f3f3f3',
    });

    setCanvas(fabricCanvas);

    fabricCanvas.on('selection:created', updateActiveText);
    fabricCanvas.on('selection:updated', updateActiveText);
    fabricCanvas.on('selection:cleared', () => setActiveText(null));
  }

  // Cleanup function — disposes Fabric canvas
  return () => {
    if (fabricCanvas) {
      fabricCanvas.dispose();
    }
  };
}, []);


  const updateActiveText = (e) => {
    if (e.selected && e.selected[0] && e.selected[0].type === 'textbox') {
      setActiveText(e.selected[0]);
      setFontSize(e.selected[0].fontSize);
      setFontColor(e.selected[0].fill);
      setIsBold(e.selected[0].fontWeight === 'bold');
      setIsItalic(e.selected[0].fontStyle === 'italic');
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
      fontSize: fontSize,
      fill: fontColor,
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      editable: true,
    });
    canvas.add(text).setActiveObject(text);
    setActiveText(text);
  };

  const updateTextStyle = () => {
    if (activeText) {
      activeText.set({
        fontSize,
        fill: fontColor,
        fontWeight: isBold ? 'bold' : 'normal',
        fontStyle: isItalic ? 'italic' : 'normal',
      });
      canvas.renderAll();
    }
  };

  useEffect(() => {
    updateTextStyle();
  }, [fontSize, fontColor, isBold, isItalic]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Image Text Editor</h2>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
      />

      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={addText}>Add Text</button>

        <select value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}>
          {[12, 14, 16, 18, 20, 24, 28, 32, 36, 40].map((size) => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>

        <input
          type="color"
          value={fontColor}
          onChange={(e) => setFontColor(e.target.value)}
        />

        <button onClick={() => setIsBold((prev) => !prev)}>
          {isBold ? 'Unbold' : 'Bold'}
        </button>

        <button onClick={() => setIsItalic((prev) => !prev)}>
          {isItalic ? 'Unitalic' : 'Italic'}
        </button>
      </div>

      <canvas ref={canvasRef} style={{ border: '1px solid #ccc', marginTop: '20px' }} />
    </div>
  );
};

export default TextEditorCanvas;
