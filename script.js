require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.29.1/min/vs' } });
require(['vs/editor/editor.main'], function() {
    // Inicializa el editor de diferencias
    let diffEditor = monaco.editor.createDiffEditor(document.getElementById('diff-container'), {
        readOnly: true
    });

    let originalModel
    let modifiedModel 

    // Evento del botón para comparar textos
    document.getElementById('compareBtn').addEventListener('click', function() {
        let text1 = document.getElementById('text1').value;
        let text2 = document.getElementById('text2').value;

        document.getElementById('diff-container').style.removeProperty('visibility')
        document.getElementById('copy').style.removeProperty('visibility')


        originalModel = monaco.editor.createModel(text1, 'sql');
        modifiedModel = monaco.editor.createModel(text2, 'sql');

        diffEditor.setModel({
            original: originalModel,
            modified: modifiedModel
        });
    });   

    document.getElementById('CopyTextOld').addEventListener('click', () => {
        navigator.clipboard.writeText(originalModel.getValue())
        .then(() => showToast('Copiado en portapapeles'))
    })
    document.getElementById('CopyTextNew').addEventListener('click', () => {
        navigator.clipboard.writeText(modifiedModel.getValue())
        .then(() => showToast('Copiado en portapapeles'))

    })


    // Función para mostrar el toast
    function showToast(message) {
        var toast = document.getElementById("toast");
        toast.textContent = message;
        toast.className = "toast show";
        setTimeout(function() { toast.className = toast.className.replace("show", ""); }, 3000);
    }


});
