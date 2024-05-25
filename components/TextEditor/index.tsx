"use client";

import React from "react";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins.pkgd.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/css/plugins/image.min.css";
import "froala-editor/js/plugins/line_breaker.min.js";
import FroalaEditorView from "react-froala-wysiwyg/FroalaEditorView";
export default function TextEditorComponent() {
  const [model, setModel] = React.useState(() => {
    const storedHtml = localStorage.getItem('savedHtml');
    return storedHtml ? storedHtml : "";
  });
  React.useEffect(() => {
    // Получаем строку HTML из localStorage
    const storedHtml = localStorage.getItem('savedHtml');
    if (storedHtml) {
      // Находим все изображения в строке HTML
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(storedHtml, 'text/html');
      const images = htmlDoc.querySelectorAll('img');

      // Конвертируем ссылки на изображения в URL
      images.forEach(img => {
        const src = img.getAttribute('src');
        if ( src && src.startsWith('blob:')) {
          fetch(src)
            .then(response => response.blob())
            .then(blob => {
              const url = URL.createObjectURL(blob);
              img.setAttribute('src', url);
            })
            .catch(error => console.error('Error fetching image:', error));
        }
      });

      // Устанавливаем обновленную разметку с обновленными ссылками на изображения
      setModel(htmlDoc.documentElement.outerHTML);
    }
  }, []);
  const events = {
    "save.before": function (html: string) {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(html, 'text/html');
      const images = htmlDoc.querySelectorAll('img');
  
      images.forEach(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('blob:')) {
          fetch(src)
            .then(response => response.blob())
            .then(blob => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                const base64data = reader.result;
                if (typeof base64data === 'string') {
                  img.setAttribute('src', base64data);
                  localStorage.setItem("savedHtml", htmlDoc.documentElement.outerHTML);
                }
              }
            })
            .catch(error => console.error('Error fetching image:', error));
        }
      });
  
      return html;
    }
  };
  return (

    <div id="editor" className="w-full flex gap-2 bg-red-400 justify-between">
      <div className="w-1/2">
      <FroalaEditor
        tag="textarea"
        model={model}
        onModelChange={(e: string) => setModel(e)}
          config={{
            imageEditButtons: ['imageReplace', 'imageAlign', 'imageRemove', '|', 'imageLink', 'linkOpen', 'linkEdit', 'linkRemove', '-', 'imageDisplay', 'imageStyle', 'imageAlt', 'imageSize'],
          saveInterval: 2000,
          placeholder: "type your blog",
          events: events,
          toolbarButtons: {
            'moreText': {
              'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
            },
            'moreParagraph': {
              'buttons': ['alignLeft', 'alignCenter', 'alignRight','alignJustify','formatOLSimple', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote']
            },
            'moreRich': {
              'buttons': ['insertLink', 'insertImage', 'insertTable', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR']
            },
            'moreMisc': {
              'buttons': [ 'fullscreen', 'spellChecker', 'selectAll', 'html', 'help']
            }
          },
        }}
      />
      </div>
      <div className="w-1/2">
        {/* <FroalaEditorView model={model}/> */}
        <div className="imgobject" dangerouslySetInnerHTML={{ __html: model }} />
      </div>
    </div>

  );
}
