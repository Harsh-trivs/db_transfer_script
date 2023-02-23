const { Client } = require("pg");

const client_new = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "yatharth",
  database: "instispacev2",
});

const client_old = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "yatharth",
  database: "instispace_backup",
});

client_new.connect();
client_old.connect();

// User Table
const populateUserTable = () =>
  client_old.query(`SELECT * FROM "User" `, async (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      const retrived_entries = await Promise.all(
        res.rows.map((i) => {
          const text =
            'INSERT INTO "User"("id","name","ldapName","roll","password","mobile","isNewUser","role","mpath","permissionId","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
          const values = [
            i.id,
            i.name,
            i.ldapName,
            i.roll,
            i.password,
            i.mobile,
            i.isNewUser,
            i.role == "HAS" ? "SECRETARY" : i.role,
            i.id + ".",
            null,
            null,
          ];

          client_new.query(text, values, (err, res) => {
            if (err) {
              console.log(err.stack);
            } else {
              count++;
            }
          });
        })
      );
      count = retrived_entries.length;
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.stack);
    }
  });

populateUserTable();

const updatePermissions = () => {
  const texts = [
    `update "User" set "permissionId"='c312bbb8-847c-4fac-a835-15a40fc4be03' where role='ADMIN';`,
    `update "User" set "permissionId"='23cde38a-bbcc-4fae-8fdc-767533c8e4eb' where role='SECRETARY'`,
    `update "User" set "permissionId"='b593d939-6f7f-44ae-b8ed-bed165c99fdb' where role='USER';`,
    `update "User" set "permissionId"='e94c6959-d113-4ad6-bb6c-41a2b7cd239f' where roll='cfi@smail.iitm.ac.in';`,
    `update "User" set "permissionId"='4000fd64-3cbd-46e4-b8f3-b24e08bd6c6c' where role='LEADS';`,
    `update "User" set "permissionId"='56745e84-86a9-4dcd-9de4-915849840635' where role='MODERATOR';`,
    `update "User" set "permissionId"='afb4d34f-cf44-4632-a167-2cdbf3a0f7c0' where role='HOSTEL_SEC';`,
  ];

  texts.map((text) => {
    client_new.query(text, (err, res) => {
      if (err) {
        console.error(err.stack);
      } else {
        console.log("Permissions Updated");
      }
    });
  });
};

updatePermissions();

const updateRoleCFI = () => {
  client_new.query(
    `update "User" set role='LEADS' where roll='cfi@smail.iitm.ac.in'`,
    (err, rse) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("Role updated");
      }
    }
  );
};

updateRoleCFI();

// Permission Table
const populatePermissionTable = () => {
  const text =
    'INSERT INTO "Permission"("id","account","livePosts","hostel","createTag","createNotification","handleReports","approvePosts") VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

  const values_user = [
    "b593d939-6f7f-44ae-b8ed-bed165c99fdb",
    null,
    [
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    null,
    false,
    false,
    false,
    false,
  ];

  client_new.query(text, values_user, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(`Values inserted`);
    }
  });

  const values_admin = [
    "c312bbb8-847c-4fac-a835-15a40fc4be03",
    ["LEADS", "SECRETARY", "MODERATOR", "HOSTEL_SEC"],
    [
      "Club Events",
      "Announcements",
      "Recruitments",
      "Competitions",
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    ["Hostel", "Contact", "Ameninity"],
    true,
    true,
    true,
    true,
  ];

  client_new.query(text, values_admin, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(`Values inserted`);
    }
  });

  const values_secys = [
    "23cde38a-bbcc-4fae-8fdc-767533c8e4eb",
    ["LEADS", "MODERATOR", "HOSTEL_SEC"],
    [
      "Club Events",
      "Announcements",
      "Recruitments",
      "Competitions",
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    ["Hostel", "Contact", "Ameninity"],
    true,
    true,
    true,
    true,
  ];

  client_new.query(text, values_secys, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Values inserted");
    }
  });

  // for CFI
  values_leads = [
    "e94c6959-d113-4ad6-bb6c-41a2b7cd239f",
    ["LEADS"],
    [
      "Club Events",
      "Announcements",
      "Recruitments",
      "Competitions",
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    null,
    false,
    false,
    false,
    false,
  ];

  client_new.query(text, values_leads, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Values inserted");
    }
  });

  // for LEADS other than CFI
  values__leads = [
    "4000fd64-3cbd-46e4-b8f3-b24e08bd6c6c",
    null,
    [
      "Club Events",
      "Announcements",
      "Recruitments",
      "Competitions",
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    null,
    false,
    false,
    false,
    false,
  ];

  client_new.query(text, values__leads, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Values inserted");
    }
  });

  const values_mods = [
    "56745e84-86a9-4dcd-9de4-915849840635",
    null,
    [
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    null,
    false,
    false,
    true,
    false,
  ];

  client_new.query(text, values_mods, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Values inserted");
    }
  });

  // HOSTEL_SECYS
  values_hsecys = [
    "afb4d34f-cf44-4632-a167-2cdbf3a0f7c0",
    ["HOSTEL_SEC"],
    [
      "Announcements",
      "Opportunities",
      "Connect",
      "Queries",
      "Help",
      "Reviews",
      "Random thoughts",
    ],
    ["Contact", "Ameninity"],
    false,
    false,
    false,
    false,
  ];

  client_new.query(text, values_hsecys, (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("Values inserted");
    }
  });
};

populatePermissionTable();

const populateTagTable = () => {
  client_old.query(`select * from "Tag" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "Tag"("id","title","category") VALUES($1, $2, $3) RETURNING *';
        const values = [i.id, i.title, i.category];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "tag_users_user" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "tag_users_user"("tagId","userId") VALUES($1, $2) RETURNING *';
        const values = [i.tagId, i.userId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });
};

populateTagTable();

const populatePostTable = () => {
  // Club Events
  client_old.query(`select * from "Event" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
        const values = [
          i.id,
          i.createdAt,
          i.createdAt,
          i.title,
          i.content,
          "Club Events",
          i.photo,
          i.isHidden,
          i.location,
          "POSTED",
          i.linkName,
          i.linkToAction,
          i.time,
          i.createdById,
        ];
        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count = count + 1;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "event_liked_by_user" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_liked_by_user"("postId","userId") VALUES($1, $2) RETURNING *';
        const values = [i.eventId, i.userId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "event_stared_by_user" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_saved_by_user"("postId","userId") VALUES($1, $2) RETURNING *';
        const values = [i.eventId, i.userId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "event_tags_tag" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_tags_tag"("postId","tagId") VALUES($1, $2) RETURNING *';
        const values = [i.eventId, i.tagId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  // Queries
  client_old.query(`select * from "MyQuery" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
        const values = [
          i.id,
          i.createdAt,
          i.createdAt,
          i.title,
          i.content,
          "query",
          i.photo,
          i.isHidden,
          null,
          i.status,
          null,
          null,
          null,
          i.createdById,
        ];
        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "my_query_liked_by_user" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_liked_by_user"("postId","userId") VALUES($1, $2) RETURNING *';
        const values = [i.myQueryId, i.userId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  // Opportunities
  client_old.query(`select * from "Netop" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "Post"("id","createdAt","updatedAt","title","content","category","photo","isHidden","location","status","linkName","Link","endTime","createdById") VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
        const values = [
          i.id,
          i.createdAt,
          i.createdAt,
          i.title,
          i.content,
          "opportunities",
          i.photo,
          i.isHidden,
          null,
          i.status,
          i.linkName,
          i.linkToAction,
          i.endTime,
          i.createdById,
        ];
        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "netop_liked_by_user" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_liked_by_user"("postId","userId") VALUES($1, $2) RETURNING *';
        const values = [i.netopId, i.userId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "netop_stared_by_user" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_saved_by_user"("postId","userId") VALUES($1, $2) RETURNING *';
        const values = [i.netopId, i.userId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });

  client_old.query(`select * from "netop_tags_tag" `, (err, res) => {
    if (!err) {
      console.log(`fetched entries ${res.rows.length}`);
      let count = 0;
      for (const i of res.rows) {
        const text =
          'INSERT INTO "post_tags_tag"("postId","tagId") VALUES($1, $2) RETURNING *';
        const values = [i.netopId, i.tagId];

        client_new.query(text, values, (err, res) => {
          if (err) {
            console.log(err.stack);
          } else {
            count++;
          }
        });
      }
      console.log(`retrived entries ${count}`);
    } else {
      console.log(err.message);
    }
  });
};

populatePostTable();

client_new.end;
client_old.end;
