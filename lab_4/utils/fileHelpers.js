export const formatSize = (bytes) => {
    if (bytes < 1024) {
        return bytes + ' B';
    }

    if (bytes < 1024 * 1024) {
        return (
            (bytes / 1024).toFixed(2) + ' KB'
        );
    }

    if (bytes < 1024 * 1024 * 1024) {
        return (
            (bytes / 1024 / 1024).toFixed(2) +
            ' MB'
        );
    }

    return (
        (
            bytes /
            1024 /
            1024 /
            1024
        ).toFixed(2) + ' GB'
    );
};

export const formatDate = (timestamp) => {
    if (!timestamp) {
        return 'Невідомо';
    }

    return new Date(
        timestamp * 1000
    ).toLocaleString();
};