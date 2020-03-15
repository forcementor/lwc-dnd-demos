Account testAccount = new Account(Name = 'ACME Flying Machines, Inc.');
insert testAccount;
List<Task> toInsert = new List<Task>();

toInsert.add(
    new Task(
        WhatId = testAccount.Id,
        Status = 'Not Started',
        Subject = 'Design flight tests',
        Description = 'Brainstorm list of tests for ornithopter.',
        ActivityDate = Date.today().addDays(3)
    )
);

toInsert.add(
    new Task(
        WhatId = testAccount.Id,
        Status = 'In Progress',
        Subject = 'Create check list for ',
        Description = 'Call Mojo Pizza about catering and community rec center to confirm space',
        ActivityDate = Date.today().addDays(3)
    )
);

toInsert.add(
    new Task(
        WhatId = testAccount.Id,
        Status = 'Completed',
        Subject = 'Reach out to logistics company',
        Description = 'Truck There It Is said they can offer some free pickups after the event',
        ActivityDate = Date.today().addDays(-15)
    )
);

toInsert.add(
    new Task(
        WhatId = testAccount.Id,
        Status = 'Waiting on someone else',
        Subject = 'Construct bins',
        Description = 'Get It Together! said they can deliver bins we can use to hold recycled goods, waiting for their delivery by next week',
        ActivityDate = Date.today().addDays(5)
    )
);

toInsert.add(
    new Task(
        WhatId = testAccount.Id,
        Status = 'Deferred',
        Subject = 'Create Mr. Fusion reactor',
        ActivityDate = Date.today().addYears(10),
        Description = 'Doc said something about not needing streets?'
    )
);


insert toInsert;