/**
 * Skenario Pengujian:
 *
 * - CommentInput component
 *  - harus menampilkan pesan ajakan login ketika pengguna belum login
 *  - harus menangani pengetikan input komentar dengan benar ketika pengguna sudah login
 *  - harus memanggil onAddComment saat tombol kirim diklik dengan isi komentar
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

describe('CommentInput component', () => {
  it('harus menampilkan pesan ajakan login ketika pengguna belum login', () => {
    // arrange
    render(
      <BrowserRouter>
        <CommentInput onAddComment={() => {}} authUser={null} />
      </BrowserRouter>
    );

    // assert
    expect(screen.getByText(/silakan/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /masuk untuk berkomentar/i })).toBeInTheDocument();
  });

  it('harus menangani pengetikan input komentar dengan benar ketika pengguna sudah login', async () => {
    // arrange
    const authUser = { id: 'user-1', name: 'John Doe' };
    render(
      <BrowserRouter>
        <CommentInput onAddComment={() => {}} authUser={authUser} />
      </BrowserRouter>
    );
    const textarea = screen.getByPlaceholderText(/tuliskan komentar/i);

    // action
    await userEvent.type(textarea, 'Komentar pengujian');

    // assert
    expect(textarea.value).toBe('Komentar pengujian');
  });

  it('harus memanggil onAddComment saat tombol kirim diklik dengan isi komentar', async () => {
    // arrange
    const mockOnAddComment = vi.fn().mockResolvedValue({ success: true });
    const authUser = { id: 'user-1', name: 'John Doe' };
    render(
      <BrowserRouter>
        <CommentInput onAddComment={mockOnAddComment} authUser={authUser} />
      </BrowserRouter>
    );
    const textarea = screen.getByPlaceholderText(/tuliskan komentar/i);
    const submitButton = screen.getByRole('button', { name: /kirim komentar/i });

    // action
    await userEvent.type(textarea, 'Komentar baru');
    await userEvent.click(submitButton);

    // assert
    expect(mockOnAddComment).toHaveBeenCalledWith('Komentar baru');
  });
});
