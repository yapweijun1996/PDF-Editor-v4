# PDF Editor v4

A powerful, web-based PDF viewer and editor built with PDF.js, providing comprehensive document viewing and annotation capabilities with modern UI/UX.

## 🚀 Features

### For Users
- **📄 PDF Viewing**: High-quality PDF rendering with support for all PDF formats
- **🔍 Advanced Navigation**: Page navigation, bookmarks, thumbnails, and outline support
- **🔎 Search & Find**: Full-text search with highlighting and advanced options
- **📝 Annotation Tools**:
  - ✏️ **Text Highlighting**: Highlight important text with customizable colors
  - 📝 **Free Text**: Add text annotations anywhere on the document
  - 🖊️ **Ink Drawing**: Freehand drawing and annotation tools
  - 🏷️ **Stamps**: Add predefined or custom stamps
  - ✍️ **Signatures**: Digital signature support with multiple input methods
  - 💬 **Comments**: Add and manage document comments
- **🎨 Rich Formatting**: Customizable colors, fonts, and styling for annotations
- **🔧 AI-Powered Features**: Automatic alt-text generation for images (when enabled)
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **♿ Accessibility**: Screen reader support and keyboard navigation
- **🌙 Theme Support**: Light and dark mode compatibility

### For Developers
- **🛠️ Extensible Architecture**: Built with modular, extensible components
- **⚙️ Configurable Options**: Extensive customization through app options
- **🎯 Event-Driven**: Event bus system for easy integration
- **🔌 Plugin Support**: Easy to extend with custom tools and features
- **📊 Telemetry**: Built-in analytics and reporting capabilities

## 📋 Requirements

- Modern web browser with JavaScript enabled
- No additional dependencies required - runs entirely in the browser
- Local file access for offline usage (requires appropriate browser permissions)

## 🚀 Quick Start

### Option 1: Open Directly
1. Open `index.html` in your web browser
2. Click "Open File" or drag and drop a PDF file
3. Start viewing and editing your document

### Option 2: Local Development Server
```bash
# Using Python (if available)
python -m http.server 8000

# Using Node.js (if available)
npx serve .

# Using PHP (if available)
php -S localhost:8000
```
Then open `http://localhost:8000` in your browser.

## 📖 User Guide

### Basic Navigation
- **Page Navigation**: Use toolbar buttons, keyboard arrows, or page input field
- **Zoom Control**: Use zoom buttons, mouse wheel, or zoom dropdown
- **View Modes**: Switch between single page, continuous, or book view
- **Rotation**: Rotate pages clockwise or counterclockwise

### Using Annotation Tools
1. **Select a Tool**: Click on any annotation tool in the toolbar (highlight, text, ink, etc.)
2. **Customize Settings**: Use the tool parameters panel to adjust colors, sizes, and other properties
3. **Apply Annotations**: Click or drag on the document to add your annotations
4. **Edit Annotations**: Click on existing annotations to modify or delete them

### Search Functionality
1. Click the search button (🔍) in the toolbar
2. Enter your search terms
3. Use "Highlight all" to see all matches
4. Navigate through results with Previous/Next buttons

### Saving Your Work
- **Download Original**: Save the original PDF file
- **Download with Annotations**: Save your PDF with all annotations included
- **Auto-save**: Annotations are automatically saved locally

## ⚙️ Developer Guide

### Project Structure
```
├── index.html              # Main HTML file
├── viewer.js              # Main viewer application
├── app.js                 # Core application logic
├── viewer.css             # Main stylesheet
├── app_options.js         # Configuration options
├── pdf_viewer.js          # PDF rendering component
├── annotation_editor_*.js # Annotation editing tools
├── toolbar.js             # Toolbar component
├── pdf_sidebar.js         # Sidebar component
└── src/                   # PDF.js library source
```

### Key Components

#### PDFViewerApplication (app.js)
Main application class that orchestrates all functionality:
- Document loading and management
- Event handling and coordination
- Component initialization
- User interaction management

#### Annotation Editor System
- **AnnotationEditorParams**: Manages annotation tool parameters
- **SignatureManager**: Handles digital signature functionality
- **CommentManager**: Manages document comments
- **AltTextManager**: AI-powered image description generation

### Configuration Options

Customize behavior through `app_options.js`:

```javascript
// Example customizations
AppOptions.set('annotationEditorMode', AnnotationEditorType.INK);
AppOptions.set('enableSignatureEditor', true);
AppOptions.set('enableComment', true);
AppOptions.set('defaultZoomValue', 'page-fit');
```

### Available App Options

| Option | Description | Default |
|--------|-------------|---------|
| `annotationEditorMode` | Default annotation editor mode | `HIGHLIGHT` |
| `enableSignatureEditor` | Enable digital signature tool | `false` |
| `enableComment` | Enable comment system | `true` |
| `defaultZoomValue` | Default zoom level | `'auto'` |
| `textLayerMode` | Text layer rendering mode | `TextLayerMode.ENABLE` |
| `annotationMode` | PDF annotation handling | `AnnotationMode.ENABLE` |

### Event System

The application uses an event-driven architecture:

```javascript
// Listen for events
eventBus.on('documentloaded', (evt) => {
  console.log('PDF document loaded:', evt);
});

// Dispatch custom events
eventBus.dispatch('customEvent', {
  source: this,
  data: customData
});
```

### Extending Functionality

#### Adding Custom Tools
1. Create a new tool class extending base functionality
2. Register the tool in the main application
3. Add UI elements to the toolbar
4. Handle tool events in the event bus

#### Custom Annotation Types
```javascript
// Example: Custom annotation type
class CustomAnnotationEditor extends AnnotationEditor {
  constructor(parameters) {
    super(parameters);
    this.type = 'custom';
  }
}
```

## 🔧 Advanced Configuration

### Build Configuration
The application supports different build targets:
- **GENERIC**: Standard web build
- **CHROME**: Chrome extension build
- **MOZCENTRAL**: Firefox extension build

### Development Mode
Enable development features by setting URL parameters:
```
index.html?pdfBugEnabled=true&disableRange=false
```

### Performance Tuning
Optimize for specific use cases:
```javascript
AppOptions.set('maxCanvasPixels', 16777216); // 4096x4096
AppOptions.set('capCanvasAreaFactor', 2.0);
AppOptions.set('enableHWA', true); // Hardware acceleration
```

## 🌐 Browser Support

- **Chrome/Chromium**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile browsers**: Limited support (viewing only)

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Install dependencies (if any)
3. Start development server
4. Make your changes
5. Test across different browsers
6. Submit pull request

### Code Style
- Use ESLint configuration provided
- Follow existing code patterns
- Add JSDoc comments for new functions
- Test changes thoroughly

### Testing
- Test with various PDF file types
- Verify annotation functionality
- Check responsive design
- Validate accessibility features

## 📄 License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## 🙏 Acknowledgments

- **PDF.js**: Core PDF rendering engine by Mozilla
- **Mozilla Foundation**: Original PDF.js viewer implementation
- **Contributors**: All community contributors

## 🆘 Support

### Common Issues
- **File won't load**: Check file permissions and browser security settings
- **Annotations not saving**: Ensure local storage is enabled
- **Performance issues**: Try reducing canvas size limits in options

### Getting Help
1. Check existing documentation
2. Review browser console for error messages
3. Test with different PDF files
4. Check browser compatibility

---

**Made with ❤️ using PDF.js**