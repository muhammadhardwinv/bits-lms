<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SessionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('sessions')->insert([
      [
        'id' => '1234',
        'title' => 'Discrete Mathematics - Introduction',
        'description' => 'This session introduces the fundamentals of discrete structures and logic.',
        'schedule_date' => Carbon::create(2025, 8, 14, 10, 57, 43),
        'course_id' => 'COCO20202',
      ],
      [
        'id' => '1235',
        'title' => 'Logic and Propositional Calculus',
        'description' => 'Students will learn about propositional logic, truth tables, and logical equivalence.',
        'schedule_date' => Carbon::create(2025, 8, 21, 9, 0, 0),
        'course_id' => 'COCO20202',
      ],
      [
        'id' => '1236',
        'title' => 'Set Theory and Applications',
        'description' => 'Covers operations on sets, Venn diagrams, and Cartesian products.',
        'schedule_date' => Carbon::create(2025, 8, 28, 9, 0, 0),
        'course_id' => 'COCO20202',
      ],
    ]);
  }
}
