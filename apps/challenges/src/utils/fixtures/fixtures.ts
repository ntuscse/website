function userFixture(overrides = {}) {
    var defaultValues = {
        name: (Math.random() + 1).toString(36).substring(2),
        email: (Math.random() + 1).toString(36).substring(2),
        active: true,
    };

    return { ...defaultValues, ...overrides };
}

function questionFixture(overrides = {}) {
    var defaultValues = {
        question_no: (Math.random() + 1).toString(36).substring(2),
        question_title: (Math.random() + 1).toString(36).substring(2),
        question_desc: (Math.random() + 1).toString(36).substring(2),
        question_date: "2022-05-01T00:00:00.000Z",
        expiry: "2040-06-01T00:00:00.000Z",
        points: 10,
        answer: (Math.random() + 1).toString(36).substring(2),
        submissions: [],
        active: true,
    };

    return { ...defaultValues, ...overrides };
}

function answerFixture(overrides = {}) {
    var defaultValues = {
        name: (Math.random() + 1).toString(36).substring(2),
        answer: (Math.random() + 1).toString(36).substring(2),
    };

    return { ...defaultValues, ...overrides };
};

function leaderboardFixture(overrides = {}) {
    var defaultValues = {
        title: (Math.random() + 1).toString(36).substring(2),
        start_date: "2023-05-01T00:00:00.000Z",
        end_date: "2040-06-01T00:00:00.000Z",
        rankings: [],
    };

    return { ...defaultValues, ...overrides };
}

export { userFixture, questionFixture, answerFixture, leaderboardFixture };