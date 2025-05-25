/**
 * School Statistics Utility
 * Automatically calculates school age and student counts based on current year
 * St. Louis Demonstration J.H.S - Founded in 1977
 */

const SCHOOL_FOUNDING_YEAR = 1977;
const BASE_STUDENT_COUNT = 30400; // Students trained by 2025
const BASE_YEAR = 2025;
const STUDENTS_PER_YEAR = 400; // Approximate new students per year

/**
 * Get the current school age in years
 * @returns {number} Years since founding
 */
export const getSchoolAge = (): number => {
  const currentYear = new Date().getFullYear();
  return currentYear - SCHOOL_FOUNDING_YEAR;
};

/**
 * Get formatted school age with "+" suffix
 * @returns {string} Formatted age like "47+" or "50+"
 */
export const getSchoolAgeFormatted = (): string => {
  return `${getSchoolAge()}+`;
};

/**
 * Get estimated total students trained
 * Updates every year automatically
 * @returns {number} Total estimated students
 */
export const getTotalStudentsTrained = (): number => {
  const currentYear = new Date().getFullYear();
  const yearsPassedSinceBase = currentYear - BASE_YEAR;
  const additionalStudents = yearsPassedSinceBase * STUDENTS_PER_YEAR;
  return BASE_STUDENT_COUNT + additionalStudents;
};

/**
 * Get formatted total students with appropriate suffix
 * Rounds to nearest thousand and adds "+" suffix
 * @returns {string} Formatted count like "30,000+" or "35,000+"
 */
export const getTotalStudentsFormatted = (): string => {
  const total = getTotalStudentsTrained();

  // Round to nearest thousand
  const rounded = Math.floor(total / 1000) * 1000;

  // Format with commas and + suffix
  return `${rounded.toLocaleString()}+`;
};

/**
 * Get school founding year
 * @returns {number} The year school was founded
 */
export const getFoundingYear = (): number => {
  return SCHOOL_FOUNDING_YEAR;
};

/**
 * Get current year
 * @returns {number} Current year for copyright and other uses
 */
export const getCurrentYear = (): number => {
  return new Date().getFullYear();
};

/**
 * Get years range from founding to current
 * @returns {string} Range like "1977-2024" or "1977-2030"
 */
export const getYearsRange = (): string => {
  const currentYear = new Date().getFullYear();
  return `${SCHOOL_FOUNDING_YEAR}-${currentYear}`;
};

/**
 * Get current enrollment (estimated)
 * @returns {number} Current estimated enrollment
 */
export const getCurrentEnrollment = (): number => {
  // Fixed enrollment as it's unpredictable year to year
  return 850; // Current approximate enrollment
};

/**
 * Get formatted current enrollment
 * @returns {string} Formatted like "850+" or "900+"
 */
export const getCurrentEnrollmentFormatted = (): string => {
  return `${getCurrentEnrollment()}+`;
};

/**
 * Get all school stats in one object
 * @returns {object} Complete stats object
 */
export const getSchoolStats = () => {
  return {
    age: getSchoolAge(),
    ageFormatted: getSchoolAgeFormatted(),
    totalStudents: getTotalStudentsTrained(),
    totalStudentsFormatted: getTotalStudentsFormatted(),
    currentEnrollment: getCurrentEnrollment(),
    currentEnrollmentFormatted: getCurrentEnrollmentFormatted(),
    foundingYear: getFoundingYear(),
    yearsRange: getYearsRange(),
    currentYear: new Date().getFullYear()
  };
};

/**
 * Get decade-based performance data
 * @returns {array} Array of decade performance objects
 */
export const getDecadePerformance = () => {
  const currentYear = new Date().getFullYear();
  const currentDecade = Math.floor(currentYear / 10) * 10;

  return [
    {
      decade: '1970s-80s',
      period: '1977-1989',
      rate: '89.2%',
      description: 'Foundation Years',
      color: 'from-amber-500 to-orange-400',
      textColor: 'text-amber-300'
    },
    {
      decade: '1990s',
      period: '1990-1999',
      rate: '91.5%',
      description: 'Growth Era',
      color: 'from-emerald-500 to-green-400',
      textColor: 'text-emerald-300'
    },
    {
      decade: '2000s',
      period: '2000-2009',
      rate: '93.8%',
      description: 'Modernization',
      color: 'from-blue-500 to-cyan-400',
      textColor: 'text-blue-300'
    },
    {
      decade: '2010s',
      period: '2010-2019',
      rate: '95.4%',
      description: 'Innovation',
      color: 'from-purple-500 to-violet-400',
      textColor: 'text-purple-300'
    },
    {
      decade: `${currentDecade}s`,
      period: `${currentDecade}-${currentYear}`,
      rate: '97.1%',
      description: 'Excellence Peak',
      color: 'from-green-500 to-emerald-400',
      textColor: 'text-green-300',
      highlight: true
    },
    {
      decade: `${currentDecade + 10}+`,
      period: 'Future',
      rate: '99%+',
      description: 'Continued Growth',
      color: 'from-yellow-500 to-amber-400',
      textColor: 'text-yellow-300',
      future: true
    }
  ];
};

export default {
  getSchoolAge,
  getSchoolAgeFormatted,
  getTotalStudentsTrained,
  getTotalStudentsFormatted,
  getCurrentEnrollment,
  getCurrentEnrollmentFormatted,
  getFoundingYear,
  getCurrentYear,
  getYearsRange,
  getSchoolStats,
  getDecadePerformance
};
