export const academicTitleToRequiredWorkingHours = {
    'None': 600, 'Professor.': 850, 'Associate Professor.': 750, 'Dr.': 700
}

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
    }
}

export const managerToExemption = {
    'None': 1, 'Rector': 0.15, 'Vice Rector': 0.2, 'Manager': 0.25, 'Vice Manager': 0.3, 'Head of Department': 0.7,
    'Deputy Head of Department': 0.75, 'Subject Manager': 0.8, 'Deputy Subject Manager': 0.85
}

export const unionTitleToExemption = {
    'None': 1, 'Party Secretary': 0.15, 'Deputy Party Secretary': 0.3, 'Secretary': 0.85, 'Deputy Secretary': 0.9, 'Secretary of Youth Union': 0.5,
    'Deputy Secretary of Youth Union': 0.6, 'Student Union President': 0.6, 'Student Union Vice President': 0.7
}