/**
 * Skenario Pengujian:
 *
 * - CategoryFilter component
 *  - harus menampilkan semua kategori yang disediakan
 *  - harus memanggil onSelectCategory dengan nama kategori ketika tombol kategori diklik
 *  - harus memanggil onSelectCategory(null) ketika tombol Reset Filter diklik
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from './CategoryFilter';

describe('CategoryFilter component', () => {
  it('harus menampilkan semua kategori yang disediakan', () => {
    // arrange
    const categories = ['redux', 'react', 'javascript'];
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory={null}
        onSelectCategory={() => {}}
      />
    );

    // assert
    expect(screen.getByRole('button', { name: /semua/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#redux/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#react/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /#javascript/i })).toBeInTheDocument();
  });

  it('harus memanggil onSelectCategory dengan nama kategori ketika tombol kategori diklik', async () => {
    // arrange
    const categories = ['redux', 'react'];
    const mockOnSelectCategory = vi.fn();
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory={null}
        onSelectCategory={mockOnSelectCategory}
      />
    );
    const reduxButton = screen.getByRole('button', { name: /#redux/i });

    // action
    await userEvent.click(reduxButton);

    // assert
    expect(mockOnSelectCategory).toHaveBeenCalledWith('redux');
  });

  it('harus memanggil onSelectCategory(null) ketika tombol Reset Filter diklik', async () => {
    // arrange
    const categories = ['redux', 'react'];
    const mockOnSelectCategory = vi.fn();
    render(
      <CategoryFilter
        categories={categories}
        selectedCategory="redux"
        onSelectCategory={mockOnSelectCategory}
      />
    );
    const resetButton = screen.getByRole('button', { name: /reset filter/i });

    // action
    await userEvent.click(resetButton);

    // assert
    expect(mockOnSelectCategory).toHaveBeenCalledWith(null);
  });
});
