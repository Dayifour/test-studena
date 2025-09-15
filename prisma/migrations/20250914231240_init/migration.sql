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
CREATE TABLE "_SubjectToTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SubjectToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SubjectToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LevelToTutor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LevelToTutor_A_fkey" FOREIGN KEY ("A") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LevelToTutor_B_fkey" FOREIGN KEY ("B") REFERENCES "Tutor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_LevelToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LevelToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Level" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LevelToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_StudentToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_StudentToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Student" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_StudentToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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

-- Ajout des niveaux
INSERT INTO "Level" ("name") VALUES
    ('Primaire'),
    ('Collège'),
    ('Lycée'),
    ('Terminale'),
    ('BTS'),
    ('Licence'),
    ('Master');
-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_SubjectToTutor_AB_unique" ON "_SubjectToTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_SubjectToTutor_B_index" ON "_SubjectToTutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToTutor_AB_unique" ON "_LevelToTutor"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToTutor_B_index" ON "_LevelToTutor"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LevelToStudent_AB_unique" ON "_LevelToStudent"("A", "B");

-- CreateIndex
CREATE INDEX "_LevelToStudent_B_index" ON "_LevelToStudent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_StudentToSubject_AB_unique" ON "_StudentToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_StudentToSubject_B_index" ON "_StudentToSubject"("B");
