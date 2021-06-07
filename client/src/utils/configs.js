export const publicationRankingToResearchHours = {
    'article': {
        'Select Ranking': 0, 'Q1, Q2 (ISI)': 1200, 'Q3, Q4 (ISI)': 1100, 'Scopus': 1000, 'VNU Journals': 900, 'Reputed Journals (not included in ISI/Scopus)': 900,
        'Reputed Domestic Journals': 600, 'Domestic Journals Having ISSN': 300,
    },
    'conference-workshop-item': {
        'Select Ranking': 0, 'ISI/Scopus Conference Proceedings or Reputed Sponsors': 900, 'English Peer-reviewed Conference Proceedings': 600,
        'National Conference Proceedings Having ISBN': 450, 'UET Proceedings': 320
    },
    'book': {
        'Select Ranking': 0, 'Internationally Published Book': 2700, 'Domestic Book': 1800, 'Internationally Published Textbook': 1800, 'Domestic Textbook': 900
    },
    'book-section': {
        'Select Ranking': 0, 'Internationally Published Book Chapter': 1200
    },
    'patent': {
        'Select Ranking': 0, 'International Patent (US, Europe, Northeast Asia)': 3000,
        'Domestic Patent': 1200, 'International/National Awards': 600, 'Accepted Patent Application': 300
    },
    'project-grant': {
        'Select Ranking': 0, 'National Grants': 1000, 'VNU and Ministers\' Grants': 500,
        'University\'s Grants': 150
    }
}

export const academicTitleToRequiredWorkingHours = {
    'Giảng viên': 600, 'Giáo sư': 850, 'Phó Giáo sư': 750, 'Tiến sĩ': 700
}

export const managerToExemption = {
    'Không có chức vụ quản lý': 1, 'Hiệu trưởng': 0.15, 'Phó hiệu trưởng': 0.2, 'Manager': 0.25, 'Vice Manager': 0.3, 'Trưởng khoa': 0.7,
    'Phó trưởng khoa': 0.75, 'Trưởng bộ môn': 0.8, 'Phó trưởng bộ môn': 0.85
}

export const unionTitleToExemption = {
    'Không có chức vụ Đoàn thể': 1, 'Bí thư Đảng Uỷ': 0.15, 'Phó Bí thư Đảng Uỷ': 0.3, 'Bí thư Chi Bộ': 0.85, 'Phó Bí thư Chi Bộ': 0.9, 'Bí thư Đoàn Thanh Niên': 0.5,
    'Phó Bí thư Đoàn Thanh Niên': 0.6, 'Chủ tịch Hội sinh viên': 0.6, 'Phó Chủ tịch Hội sinh viên': 0.7
}

export const getARandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

export const publicationSorting = ['Thêm gần đây', 'Tiêu đề tăng dần', 'Tiêu đề giảm dần', 'Ngày tăng dần', 'Ngày giảm dần'];
export const sortPublications = (unsortedPublications, sortingType) => {
    let sorted = unsortedPublications;
    if (sortingType === publicationSorting[0]) sorted.sort((a, b) => a.databaseAddedOn > b.databaseAddedOn ? -1 : 1);
    if (sortingType === publicationSorting[1]) sorted.sort((a, b) => a.title < b.title ? -1 : 1);
    if (sortingType === publicationSorting[2]) sorted.sort((a, b) => a.title > b.title ? -1 : 1);
    if (sortingType === publicationSorting[3]) sorted.sort((a, b) => a.selectedDate < b.selectedDate ? -1 : 1);
    if (sortingType === publicationSorting[4]) sorted.sort((a, b) => a.selectedDate > b.selectedDate ? -1 : 1);
    return sorted;
}
export const searchPublications = (publications, searchContent) => {
    const matchedPublications = [];
    publications.forEach(fi => {
        let canAdd = false;
        const searchKey = searchContent.toLowerCase();
        if (fi.title.toLowerCase().includes(searchKey)) canAdd = true;
        if (fi.selectedDate.toLowerCase().includes(searchKey)) canAdd = true;
        fi.creators.forEach(c => {
            if ((c.familyName + ' ' + c.givenName + ' ' + c.email).toLowerCase().includes(searchKey)) canAdd = true;
        })
        if (canAdd) matchedPublications.push(fi);
    })
    return matchedPublications;
}

export const userSorting = ['Thêm gần đây', 'Tên tăng dần', 'Tên giảm dần', 'Email tăng dần', 'Email giảm dần'];
export const sortUsers = (unsortedUsers, sortingType) => {
    let sorted = unsortedUsers;
    if (sortingType === userSorting[0]) unsortedUsers.sort((a, b) => a.databaseAddedOn > b.databaseAddedOn ? -1 : 1);
    if (sortingType === userSorting[1]) unsortedUsers.sort((a, b) => (a.givenName + a.familyName) < (b.givenName + b.familyName) ? -1 : 1);
    if (sortingType === userSorting[2]) unsortedUsers.sort((a, b) => (a.givenName + a.familyName) > (b.givenName + b.familyName) ? -1 : 1);
    if (sortingType === userSorting[3]) unsortedUsers.sort((a, b) => a.email < b.email ? -1 : 1);
    if (sortingType === userSorting[4]) unsortedUsers.sort((a, b) => a.email > b.email ? -1 : 1);
    return sorted;
}
export const searchUsers = (users, searchContent) => {
    const matchedUsers = [];
    users.forEach(fi => {
        let canAdd = false;
        const searchKey = searchContent.toLowerCase();
        if (fi.givenName.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.familyName.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.email.toLowerCase().includes(searchKey)) canAdd = true;
        else if (fi.department.toLowerCase().includes(searchKey)) canAdd = true;
        if (canAdd) matchedUsers.push(fi);
    })
    return matchedUsers;
}

/* weighing based on the authorship order */
export const getResearchHours = (impactScoreOpeningUserEmail, score, authors) => {
    if (impactScoreOpeningUserEmail !== null) {
        const nPart = authors.length + (authors.length === 1 ? 1 : 2);
        for (let i = 0; i < authors.length; i++) {
            if (authors[i].email === impactScoreOpeningUserEmail) {
                if (i === 0 || i === authors.length - 1) {
                    return Math.round(score / nPart * 2);
                }
                return Math.round(score / nPart);
            }
        }
    }
    return Math.round(score / authors.length);
}

export const allPublicationTypes = ['article', 'conference-workshop-item', 'technical-report', 'book-section', 'book', 'thesis', 'patent', 'image', 'video', 'dataset', 'experiment', 'teaching-resource', 'project-grant'];
export const allPublicationColor = ['#8884d8', '#82ca9d', '#ffc658', '#E0B474', '#AFB0A8', '#9B6155', '#DE8C64', '#2F3330', '#5BCCDE', '#5F5490', '#AD5C73', '#F1C773', '#EF622F'];

export const getAllSubjects = (defaultEnabled) => {
    let allSubjects = [];
    allSubjects.push({name: 'Aerospace Engineering', isEnable: defaultEnabled});
    allSubjects.push({name: 'Communications', isEnable: defaultEnabled});
    allSubjects.push({name: 'Electronics and Computer Engineering', isEnable: defaultEnabled});
    allSubjects.push({name: 'Engineering Mechanics', isEnable: defaultEnabled});
    allSubjects.push({name: 'Engineering Physics', isEnable: defaultEnabled});
    allSubjects.push({name: 'ISI-indexed journals', isEnable: defaultEnabled});
    allSubjects.push({name: 'Information Technology (IT)', isEnable: defaultEnabled});
    allSubjects.push({name: 'Scopus-indexed journals', isEnable: defaultEnabled});
    allSubjects.push({name: 'Transportation Technology', isEnable: defaultEnabled});
    allSubjects.push({name: 'Civil Engineering', isEnable: defaultEnabled});
    return allSubjects;
}

export const getAllDivisions = (defaultEnabled) => {
    let allDivision = [];

    allDivision.push({name: 'Khoa Công Nghệ Thông Tin (FIT)', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Bộ môn Các Hệ Thống Thông Tin', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Bộ môn Công Nghệ Phần Mềm', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Bộ môn Khoa Học Máy Tính', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Bộ môn Mạng và Truyền Thông Máy Tính', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm An Toàn Thông Tin', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm Công Nghệ Tri Thức', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm Hệ Thống Nhúng', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm Tương Tác Người – Máy', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm mục tiêu Blockchain', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm mục tiêu Internet of Things', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm', isEnable: defaultEnabled});
    allDivision.push({name: 'FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo', isEnable: defaultEnabled});

    allDivision.push({name: 'Khoa Điện Tử - Viễn Thông (FET)', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Bộ môn Điện tử và Kỹ thuật máy tính', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Bộ môn Hệ thống Viễn thông', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Bộ môn Kỹ thuật Robot', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Bộ môn Thông tin Vô tuyến', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Bộ môn Vi cơ điện tử và Vi hệ thống', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Phòng thí nghiệm Tín hiệu và Hệ thống', isEnable: defaultEnabled});
    allDivision.push({name: 'FET: Phòng thực tập Điện tử – Viễn thông', isEnable: defaultEnabled});

    allDivision.push({name: 'Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)', isEnable: defaultEnabled});
    allDivision.push({name: 'FEPN: Bộ môn Công Nghệ Quang Tử', isEnable: defaultEnabled});
    allDivision.push({name: 'FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano', isEnable: defaultEnabled});
    allDivision.push({name: 'FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano', isEnable: defaultEnabled});
    allDivision.push({name: 'FEPN: Bộ môn Kỹ Thuật Năng Lượng', isEnable: defaultEnabled});

    allDivision.push({name: 'Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)', isEnable: defaultEnabled});
    allDivision.push({name: 'FEMA: Bộ môn Công Nghệ Biển và Môi Trường', isEnable: defaultEnabled});
    allDivision.push({name: 'FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá', isEnable: defaultEnabled});
    allDivision.push({name: 'FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ', isEnable: defaultEnabled});
    allDivision.push({name: 'FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường', isEnable: defaultEnabled});
    allDivision.push({name: 'FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến', isEnable: defaultEnabled});

    allDivision.push({name: 'Khoa Công Nghệ Nông Nghiệp (FAT)', isEnable: defaultEnabled});

    allDivision.push({name: 'Viện Công Nghệ Hàng Không Vũ Trụ (SAE)', isEnable: defaultEnabled});
    allDivision.push({name: 'SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không', isEnable: defaultEnabled});
    allDivision.push({name: 'SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không', isEnable: defaultEnabled});
    allDivision.push({name: 'SAE: Bộ môn Khoa Học Dữ Liệu Không Gian', isEnable: defaultEnabled});

    allDivision.push({name: 'Viện tiến tiến về Kỹ thuật và Công nghệ (AVITECH)', isEnable: defaultEnabled});
    allDivision.push({name: 'Phòng Thí nghiệm trọng điểm Công Nghệ Micro và Nano (NANOLAB)', isEnable: defaultEnabled});

    allDivision.push({name: 'Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)', isEnable: defaultEnabled});
    allDivision.push({name: 'Phòng thí nghiệm trọng điểm Các Hệ Thống Tích Hợp Thông Minh (SISLAB)', isEnable: defaultEnabled});
    allDivision.push({name: 'Trung tâm Nghiên cứu Điện tử - Viễn thông (CETR)', isEnable: defaultEnabled});
    return allDivision;
}