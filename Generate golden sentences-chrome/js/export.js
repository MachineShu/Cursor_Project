class CardExporter {
    constructor(editor) {
        this.editor = editor;
        this.initializeExport();
    }

    initializeExport() {
        const exportBtn = document.getElementById('exportCard');
        const modal = document.getElementById('exportModal');
        const confirmBtn = document.getElementById('confirmExport');
        const cancelBtn = document.getElementById('cancelExport');

        exportBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });

        confirmBtn.addEventListener('click', () => {
            this.exportCard();
            modal.style.display = 'none';
        });

        cancelBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    async exportCard() {
        const format = document.getElementById('exportFormat').value;
        const quality = document.getElementById('exportQuality').value / 100;
        const width = document.getElementById('exportWidth').value;
        const height = document.getElementById('exportHeight').value;

        const cardElement = document.getElementById('cardContent');
        
        try {
            const canvas = await html2canvas(cardElement, {
                width: width || undefined,
                height: height || undefined,
                scale: 2,
                useCORS: true,
                backgroundColor: null
            });

            const dataUrl = canvas.toDataURL(`image/${format}`, quality);
            
            // 创建下载链接
            const link = document.createElement('a');
            link.download = `card.${format}`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('导出失败:', err);
        }
    }
} 