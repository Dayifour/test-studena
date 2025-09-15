-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Level" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "day" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "tutorId" INTEGER,
    "studentId" INTEGER,
    CONSTRAINT "Availability_tutorId_fkey" FOREIGN KEY ("tutorId") REFERENCES "Tutor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Availability_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Student" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TutorSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TutorSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TutorSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TutorLevels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TutorLevels_A_fkey" FOREIGN KEY ("A") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TutorLevels_B_fkey" FOREIGN KEY ("B") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentLevels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentLevels_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentLevels_B_fkey" FOREIGN KEY ("B") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentSubjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- Ajout des matières
INSERT INTO "Subject" ("name") VALUES
    ('Mathématiques'),
    ('Physique'),
    ('Français'),
    ('Anglais'),
    ('SVT'),
    ('Histoire'),
    ('Géographie');

INSERT INTO "Level" ("name") VALUES
    ('Primaire'),
    ('Collège'),
    ('Lycée'),
    ('Terminale'),
    ('BTS'),
    ('Licence'),
    ('Master');

-- Ajout d'exemples de tuteurs
INSERT INTO "Tutor" ("fullName") VALUES ('Alice Dupont'), ('Bob Martin');
-- Ajout d'exemples d'élèves
INSERT INTO "Student" ("fullName") VALUES ('Claire Petit'), ('David Leroy');

-- Relations matières
-- Alice: Mathématiques, Physique
INSERT INTO "_TutorSubjects" ("A", "B") VALUES (1, 1), (1, 2);
-- Bob: Français, Anglais
INSERT INTO "_TutorSubjects" ("A", "B") VALUES (2, 3), (2, 4);
-- Claire: Mathématiques, Français
INSERT INTO "_StudentSubjects" ("A", "B") VALUES (1, 1), (1, 3);
-- David: Physique, Anglais
INSERT INTO "_StudentSubjects" ("A", "B") VALUES (2, 2), (2, 4);

-- Relations niveaux
-- Alice: Collège, Lycée
INSERT INTO "_TutorLevels" ("A", "B") VALUES (1, 2), (1, 3);
-- Bob: Lycée, Terminale
INSERT INTO "_TutorLevels" ("A", "B") VALUES (2, 3), (2, 4);
-- Claire: Collège, Lycée
INSERT INTO "_StudentLevels" ("A", "B") VALUES (1, 2), (1, 3);
-- David: Lycée, Terminale
INSERT INTO "_StudentLevels" ("A", "B") VALUES (2, 3), (2, 4);

-- Disponibilités (Alice: Lundi 18:00-20:00, Bob: Mardi 17:00-19:00)
INSERT INTO "Availability" ("day", "startTime", "endTime", "tutorId") VALUES ('Lundi', '18:00', '20:00', 1), ('Mardi', '17:00', '19:00', 2);
-- Disponibilités (Claire: Lundi 18:30-19:30, David: Mardi 17:30-18:30)
INSERT INTO "Availability" ("day", "startTime", "endTime", "studentId") VALUES ('Lundi', '18:30', '19:30', 1), ('Mardi', '17:30', '18:30', 2);
-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorSubjects_AB_unique" ON "_TutorSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorSubjects_B_index" ON "_TutorSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TutorLevels_AB_unique" ON "_TutorLevels"("A", "B");

-- CreateIndex
CREATE INDEX "_TutorLevels_B_index" ON "_TutorLevels"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentLevels_AB_unique" ON "_StudentLevels"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentLevels_B_index" ON "_StudentLevels"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentSubjects_AB_unique" ON "_StudentSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentSubjects_B_index" ON "_StudentSubjects"("B");
